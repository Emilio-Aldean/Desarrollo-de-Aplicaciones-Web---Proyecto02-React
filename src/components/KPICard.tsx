import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface KPICardProps {
  title: string;
  value: string | number;
}

export default function KPICard({ title, value }: KPICardProps) {
  return (
    <Card sx={{ flex: 1, textAlign: 'center', backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 2, minHeight: 100 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e3a5f', lineHeight: 1.2 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
