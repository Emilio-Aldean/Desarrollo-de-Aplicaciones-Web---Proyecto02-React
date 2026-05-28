import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import type { HappinessRecord } from '../../types/DashboardTypes';

interface Props {
  data: HappinessRecord[];
}

export default function ScatterPlotChart({ data }: Props) {
  const points = data.map((d) => ({
    x: Number(d.gdpPerCapita.toFixed(3)),
    y: Number(d.happinessScore.toFixed(3)),
    id: d.country,
  }));

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        PIB per cápita vs. Happiness Score
      </Typography>
      <ScatterChart
        height={300}
        series={[{ data: points, label: 'País', color: '#f57c00' }]}
        xAxis={[{ label: 'GDP per Capita' }]}
        yAxis={[{ label: 'Happiness Score' }]}
        margin={{ left: 60, right: 20, top: 20, bottom: 50 }}
      />
    </Box>
  );
}
