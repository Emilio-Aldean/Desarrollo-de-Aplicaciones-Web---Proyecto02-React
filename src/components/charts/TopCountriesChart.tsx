import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import type { HappinessRecord } from '../../types/DashboardTypes';

interface Props {
  data: HappinessRecord[];
}

export default function TopCountriesChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.happinessScore - a.happinessScore).slice(0, 10);
  const countries = sorted.map((d) => d.country);
  const scores = sorted.map((d) => Number(d.happinessScore.toFixed(2)));

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Top 10 Países por Felicidad
      </Typography>
      <BarChart
        height={300}
        series={[{ data: scores, label: 'Happiness Score', color: '#1e3a5f' }]}
        xAxis={[{ scaleType: 'band', data: countries, tickLabelStyle: { fontSize: 10 } }]}
        margin={{ left: 40, right: 10, top: 20, bottom: 60 }}
      />
    </Box>
  );
}
