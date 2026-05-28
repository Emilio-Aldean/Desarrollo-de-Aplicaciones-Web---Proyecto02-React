import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read .env manually
const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val.length) env[key.trim()] = val.join('=').trim();
});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else { current += char; }
    }
    values.push(current.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  });
}

function normalizeRow(row, year, regionMap) {
  let country, region, score, gdp, social, health, freedom, generosity, corruption;

  if (year === 2015 || year === 2016) {
    country = row['Country'];
    region = row['Region'];
    score = parseFloat(row['Happiness Score']);
    gdp = parseFloat(row['Economy (GDP per Capita)']);
    social = parseFloat(row['Family']);
    health = parseFloat(row['Health (Life Expectancy)']);
    freedom = parseFloat(row['Freedom']);
    generosity = parseFloat(row['Generosity']);
    corruption = parseFloat(row['Trust (Government Corruption)']);
  } else if (year === 2017) {
    country = row['Country'];
    region = regionMap[country] || 'Unknown';
    score = parseFloat(row['Happiness.Score']);
    gdp = parseFloat(row['Economy..GDP.per.Capita.']);
    social = parseFloat(row['Family']);
    health = parseFloat(row['Health..Life.Expectancy.']);
    freedom = parseFloat(row['Freedom']);
    generosity = parseFloat(row['Generosity']);
    corruption = parseFloat(row['Trust..Government.Corruption.']);
  } else {
    country = row['Country or region'];
    region = regionMap[country] || 'Unknown';
    score = parseFloat(row['Score']);
    gdp = parseFloat(row['GDP per capita']);
    social = parseFloat(row['Social support']);
    health = parseFloat(row['Healthy life expectancy']);
    freedom = parseFloat(row['Freedom to make life choices']);
    generosity = parseFloat(row['Generosity']);
    corruption = parseFloat(row['Perceptions of corruption']);
  }

  return {
    country: country || '',
    region: region || 'Unknown',
    year,
    happinessScore: isNaN(score) ? 0 : score,
    gdpPerCapita: isNaN(gdp) ? 0 : gdp,
    socialSupport: isNaN(social) ? 0 : social,
    healthyLifeExpectancy: isNaN(health) ? 0 : health,
    freedom: isNaN(freedom) ? 0 : freedom,
    generosity: isNaN(generosity) ? 0 : generosity,
    perceptionsOfCorruption: isNaN(corruption) ? 0 : corruption,
  };
}

const datasetPath = 'C:\\dataset world happiness';

const data2015 = parseCSV(readFileSync(`${datasetPath}\\2015.csv`, 'utf-8'));
const data2016 = parseCSV(readFileSync(`${datasetPath}\\2016.csv`, 'utf-8'));

// Build region map from 2015 and 2016
const regionMap = {};
[...data2015, ...data2016].forEach(row => {
  if (row['Country'] && row['Region']) regionMap[row['Country']] = row['Region'];
});

const yearFiles = [
  { year: 2015, data: data2015 },
  { year: 2016, data: data2016 },
  { year: 2017, data: parseCSV(readFileSync(`${datasetPath}\\2017.csv`, 'utf-8')) },
  { year: 2018, data: parseCSV(readFileSync(`${datasetPath}\\2018.csv`, 'utf-8')) },
  { year: 2019, data: parseCSV(readFileSync(`${datasetPath}\\2019.csv`, 'utf-8')) },
];

const allRecords = [];
yearFiles.forEach(({ year, data }) => {
  data.forEach(row => {
    const record = normalizeRow(row, year, regionMap);
    if (record.country) allRecords.push(record);
  });
});

console.log(`Total records to upload: ${allRecords.length}`);

async function uploadAll(records) {
  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    records.slice(i, i + BATCH_SIZE).forEach(record => {
      batch.set(doc(collection(db, 'happiness')), record);
    });
    await batch.commit();
    console.log(`Uploaded ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
  }
  console.log('Upload complete!');
  process.exit(0);
}

uploadAll(allRecords).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
