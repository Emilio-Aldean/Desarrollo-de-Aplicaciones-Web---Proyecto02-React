import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import Header from './components/Header'
import KPICard from './components/KPICard'
import TopCountriesChart from './components/charts/TopCountriesChart'
import TimeEvolutionChart from './components/charts/TimeEvolutionChart'
import RegionChart from './components/charts/RegionChart'
import ScatterPlotChart from './components/charts/ScatterPlotChart'
import { useHappinessData } from './hooks/useHappinessData'

function App() {
  const { data, loading, error } = useHappinessData()
  const [selectedRegion, setSelectedRegion] = useState('Todas')
  const [selectedYear, setSelectedYear] = useState('Todos')

  const regions = useMemo(
    () => [...new Set(data.map((d) => d.region))].filter((r) => r && r !== 'Unknown').sort(),
    [data]
  )
  const years = useMemo(() => [...new Set(data.map((d) => d.year))].sort(), [data])

  const filtered = useMemo(() => {
    return data.filter((d) => {
      const regionMatch = selectedRegion === 'Todas' || d.region === selectedRegion
      const yearMatch = selectedYear === 'Todos' || d.year === parseInt(selectedYear)
      return regionMatch && yearMatch
    })
  }, [data, selectedRegion, selectedYear])

  const kpis = useMemo(() => {
    if (!filtered.length) return null
    const avg = filtered.reduce((sum, d) => sum + d.happinessScore, 0) / filtered.length
    const sorted = [...filtered].sort((a, b) => b.happinessScore - a.happinessScore)

    const regionMap = new Map<string, number[]>()
    filtered.forEach((d) => {
      if (!regionMap.has(d.region)) regionMap.set(d.region, [])
      regionMap.get(d.region)!.push(d.happinessScore)
    })
    let topRegion = ''
    let topRegionAvg = 0
    regionMap.forEach((scores, region) => {
      const regionAvg = scores.reduce((a, b) => a + b, 0) / scores.length
      if (regionAvg > topRegionAvg) { topRegionAvg = regionAvg; topRegion = region }
    })

    return {
      avg: avg.toFixed(2),
      happiest: sorted[0]?.country || '-',
      leastHappy: sorted[sorted.length - 1]?.country || '-',
      topRegion,
      totalCountries: new Set(filtered.map((d) => d.country)).size,
    }
  }, [filtered])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Header
        regions={regions}
        years={years}
        selectedRegion={selectedRegion}
        selectedYear={selectedYear}
        onRegionChange={setSelectedRegion}
        onYearChange={setSelectedYear}
      />

      <Box sx={{ p: 3 }}>
        {kpis && (
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <KPICard title="Felicidad Promedio" value={kpis.avg} />
            <KPICard title="País Más Feliz" value={kpis.happiest} />
            <KPICard title="País Menos Feliz" value={kpis.leastHappy} />
            <KPICard title="Región Líder" value={kpis.topRegion} />
            <KPICard title="Total de Países" value={kpis.totalCountries} />
          </Box>
        )}

        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
              <TopCountriesChart data={filtered} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
              <TimeEvolutionChart data={filtered} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
              <RegionChart data={filtered} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
              <ScatterPlotChart data={filtered} />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
          Fuente: World Happiness Report (2015–2019) — Kaggle
        </Typography>
      </Box>
    </Box>
  )
}

export default App
