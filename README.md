# Big Five Personality Test

A scientifically-validated personality assessment application based on the **IPIP-NEO-120** inventory.

![Big Five Test](https://img.shields.io/badge/IPIP--NEO--120-Public%20Domain-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- **Complete IPIP-NEO-120 Implementation**: All 120 public domain items measuring the Big Five traits
- **Scientifically Accurate Scoring**: Proper handling of reverse-scored items, facet calculations, and trait aggregation
- **30 Facet Breakdown**: Detailed sub-trait analysis (6 facets per trait)
- **Responsible Interpretations**: Non-diagnostic, tendency-focused language
- **PDF Export**: Download professional reports of your results
- **Pause & Resume**: Save your progress and continue later
- **Privacy-First**: All data stored locally in your browser
- **Mobile-Friendly**: Responsive design for all devices
- **Accessible**: Follows WCAG guidelines

## The Big Five Traits

| Trait                   | Description                                       |
| ----------------------- | ------------------------------------------------- |
| **Openness**            | Creativity, curiosity, and preference for novelty |
| **Conscientiousness**   | Organization, dependability, and self-discipline  |
| **Extraversion**        | Sociability, assertiveness, and positive emotions |
| **Agreeableness**       | Cooperation, trust, and empathy                   |
| **Emotional Stability** | Resilience, calmness, and stress tolerance        |

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Build**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/big-5-personality-test.git
cd big-5-personality-test

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Main layout with header/footer
│   ├── TraitChart.tsx   # Radar and bar charts
│   ├── FacetBreakdown.tsx # Facet detail views
│   └── PDFReport.tsx    # PDF generation component
├── context/
│   └── TestContext.tsx  # Global state management
├── data/
│   └── questions.ts     # All 120 IPIP-NEO-120 items
├── lib/
│   ├── scoring.ts       # Scoring algorithm
│   ├── interpretations.ts # Trait/facet interpretations
│   └── storage.ts       # Local storage utilities
├── pages/
│   ├── HomePage.tsx     # Landing page
│   ├── TestPage.tsx     # Questionnaire interface
│   ├── ResultsPage.tsx  # Results dashboard
│   └── AboutPage.tsx    # Information & disclaimers
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main app with routing
└── main.tsx             # Entry point
```

## Scoring Methodology

### Likert Scale

- 1 = Very Inaccurate
- 2 = Moderately Inaccurate
- 3 = Neither Accurate Nor Inaccurate
- 4 = Moderately Accurate
- 5 = Very Accurate

### Reverse Scoring

For reverse-scored items: `adjusted_score = 6 - response`

### Score Calculation

1. **Facet Score**: Mean of 4 items per facet (raw: 1-5)
2. **Trait Score**: Mean of 6 facet scores (raw: 1-5)
3. **Percent Score**: `((raw_score - 1) / 4) * 100`

### Score Ranges

- **Low**: 0-35%
- **Moderate**: 36-65%
- **High**: 66-100%

## Ethical Considerations

This application follows responsible assessment practices:

- ✅ Clear disclaimers that this is not a clinical tool
- ✅ Results framed as tendencies, not fixed traits
- ✅ No deterministic or identity-defining language
- ✅ Privacy-first design with local data storage
- ✅ Links to mental health resources
- ✅ Educational purpose clearly stated

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the `dist` folder
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct.

## License

This project is licensed under the MIT License. The IPIP-NEO-120 items are in the public domain.

## Acknowledgments

- [International Personality Item Pool (IPIP)](https://ipip.ori.org/)
- Costa, P. T., & McCrae, R. R. (1992) for the original NEO-PI-R
- The open-source community for the amazing tools used in this project

## Disclaimer

This assessment is for educational and self-reflection purposes only. It is not a clinical diagnosis tool and should not be used to make medical, psychological, employment, or legal decisions. If you have concerns about your mental health, please consult a qualified professional.
