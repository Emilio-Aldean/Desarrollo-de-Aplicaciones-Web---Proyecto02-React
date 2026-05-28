# World Happiness Dashboard

Dashboard interactivo para la exploración, visualización e interpretación de datos del **World Happiness Report** (2015–2023), desarrollado como Proyecto 02 de la asignatura Desarrollo de Aplicaciones Web.

## Descripción

El dashboard permite explorar y comparar el bienestar de más de 150 naciones a partir del dataset publicado anualmente por la Red de Soluciones para el Desarrollo Sostenible de la ONU. El usuario puede filtrar por región y año, visualizar rankings de países, detectar correlaciones entre variables socioeconómicas y observar tendencias temporales de felicidad global.

## Dataset

- **Fuente:** [World Happiness Report — Kaggle](https://www.kaggle.com/datasets/unsdsn/world-happiness)
- **Cobertura:** 150+ países, años 2015–2023
- **Variables categóricas:** Country, Region, Year
- **Variables numéricas:** Happiness Score, GDP per capita, Social Support, Healthy Life Expectancy, Freedom, Generosity, Perceptions of Corruption

## Tecnologías

- **React + TypeScript** — interfaz de usuario y componentes
- **Vite** — entorno de desarrollo
- **Firebase Firestore** — almacenamiento y consumo de datos
- **Recharts** — gráficos interactivos
- **Tailwind CSS** — estilos

## Funcionalidades del dashboard

- Filtros interactivos por **Región** y **Año**
- 5 indicadores KPI: Felicidad Promedio, País Más Feliz, País Menos Feliz, Región Líder, Total de Países
- Gráfico de barras horizontales: Top 10 países por felicidad
- Gráfico de líneas: Evolución temporal del bienestar global
- Gráfico de barras: Felicidad promedio por región
- Gráfico de dispersión: PIB per cápita vs. Happiness Score

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env
# (Completar con las credenciales de Firebase)

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.tsx
│   ├── KPICard.tsx
│   ├── charts/
│   │   ├── TopCountriesChart.tsx
│   │   ├── TimeEvolutionChart.tsx
│   │   ├── RegionChart.tsx
│   │   └── ScatterChart.tsx
├── firebase/
│   └── config.ts
├── hooks/
│   └── useHappinessData.ts
├── types/
│   └── index.ts
└── App.tsx
```

## Autor

Emilio Aldean — Universidad, Desarrollo de Aplicaciones Web, 2026
