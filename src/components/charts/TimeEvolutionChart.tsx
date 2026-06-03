import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import type { HappinessRecord } from '../../types/DashboardTypes';

interface Props {
  data: HappinessRecord[];
}

export default function TimeEvolutionChart({ data }: Props) {
  const years = [...new Set(data.map((d) => d.year))].sort();
  const avgByYear = years.map((year) => {
    const records = data.filter((d) => d.year === year);
    const avg = records.reduce((sum, d) => sum + d.happinessScore, 0) / records.length;
    return Number(avg.toFixed(3));
  });

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Evolución Temporal de la Felicidad Global
      </Typography>
      <LineChart
        height={340}
        series={[{ data: avgByYear, label: 'Promedio Global', color: '#2e7d32' }]}
        xAxis={[{ scaleType: 'point', data: years.map(String) }]}
        margin={{ left: 50, right: 30, top: 20, bottom: 40 }}
      />
    </Box>
  );
}
