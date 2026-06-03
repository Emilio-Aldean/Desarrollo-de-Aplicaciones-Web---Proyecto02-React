import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import type { HappinessRecord } from '../../types/DashboardTypes';

interface Props {
  data: HappinessRecord[];
}

export default function TopCountriesChart({ data }: Props) {
  const countryMap = new Map<string, number[]>();
  data.forEach((d) => {
    if (!countryMap.has(d.country)) countryMap.set(d.country, []);
    countryMap.get(d.country)!.push(d.happinessScore);
  });

  const top10 = [...countryMap.entries()]
    .map(([country, s]) => ({ country, avg: s.reduce((a, b) => a + b, 0) / s.length }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  const countries = top10.map((d) => d.country);
  const scores = top10.map((d) => Number(d.avg.toFixed(2)));

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Top 5 Países por Felicidad
      </Typography>
      <BarChart
        height={320}
        series={[{ data: scores, label: 'Happiness Score', color: '#00838f' }]}
        xAxis={[{ scaleType: 'band', data: countries, tickLabelStyle: { fontSize: 10 } }]}
        margin={{ left: 40, right: 10, top: 20, bottom: 60 }}
      />
    </Box>
  );
}
