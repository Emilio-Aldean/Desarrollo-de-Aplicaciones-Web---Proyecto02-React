import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import type { HappinessRecord } from '../../types/DashboardTypes';

interface Props {
  data: HappinessRecord[];
}

export default function RegionChart({ data }: Props) {
  const regionMap = new Map<string, number[]>();
  data.forEach((d) => {
    if (!d.region || d.region === 'Unknown') return;
    if (!regionMap.has(d.region)) regionMap.set(d.region, []);
    regionMap.get(d.region)!.push(d.happinessScore);
  });

  const abbreviate: Record<string, string> = {
    'Middle East and Northern Africa': 'Mid. East',
    'Latin America and Caribbean': 'Lat. America',
    'Southern and Eastern Europe': 'S.E. Europe',
    'Central and Eastern Europe': 'C.E. Europe',
    'Australia and New Zealand': 'Oceania',
    'Sub-Saharan Africa': 'Sub-Saharan',
    'Western Europe': 'W. Europe',
    'Eastern Asia': 'E. Asia',
    'Southern Asia': 'S. Asia',
    'North America': 'N. America',
    'Southeastern Asia': 'SE. Asia',
  };

  const regions = [...regionMap.keys()];
  const averages = regions.map((r) => {
    const scores = regionMap.get(r)!;
    return Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
  });
  const labels = regions.map((r) => abbreviate[r] ?? r);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Felicidad Promedio por Región
      </Typography>
      <BarChart
        layout="horizontal"
        height={340}
        series={[{ data: averages, label: 'Promedio', color: '#c62828' }]}
        yAxis={[{ scaleType: 'band', data: labels, tickLabelStyle: { fontSize: 10 } }]}
        margin={{ left: 150, right: 20, top: 20, bottom: 30 }}
      />
    </Box>
  );
}
