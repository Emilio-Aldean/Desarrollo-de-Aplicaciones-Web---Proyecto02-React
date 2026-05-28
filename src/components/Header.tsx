import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';

interface HeaderProps {
  regions: string[];
  years: number[];
  selectedRegion: string;
  selectedYear: string;
  onRegionChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export default function Header({
  regions,
  years,
  selectedRegion,
  selectedYear,
  onRegionChange,
  onYearChange,
}: HeaderProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e3a5f' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          🌍 World Happiness Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150, backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Región</InputLabel>
            <Select
              value={selectedRegion}
              label="Región"
              onChange={(e: SelectChangeEvent) => onRegionChange(e.target.value)}
            >
              <MenuItem value="Todas">Todas</MenuItem>
              {regions.map((r) => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Año</InputLabel>
            <Select
              value={selectedYear}
              label="Año"
              onChange={(e: SelectChangeEvent) => onYearChange(e.target.value)}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={String(y)}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
