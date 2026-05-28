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
    if (!regionMap.has(d.region)) regionMap.set(d.region, []);
    regionMap.get(d.region)!.push(d.happinessScore);
  });

  const regions = [...regionMap.keys()];
  const averages = regions.map((r) => {
    const scores = regionMap.get(r)!;
    return Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
  });

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Felicidad Promedio por Región
      </Typography>
      <BarChart
        layout="horizontal"
        height={300}
        series={[{ data: averages, label: 'Promedio', color: '#c62828' }]}
        yAxis={[{ scaleType: 'band', data: regions, tickLabelStyle: { fontSize: 9 } }]}
        margin={{ left: 160, right: 20, top: 20, bottom: 30 }}
      />
    </Box>
  );
}
