# Big Five Personality Test

A beautifully designed, scientifically-validated personality assessment application based on the **IPIP-NEO-120** inventory. Features a calming zen-inspired interface with sage green accents and minimal illustrations.

![Big Five Test](https://img.shields.io/badge/IPIP--NEO--120-Public%20Domain-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### Assessment

- **Complete IPIP-NEO-120 Implementation**: All 120 public domain items measuring the Big Five personality traits
- **Multi-Step Questionnaire**: 10-step form (12 questions per step) with progress tracking
- **Scientifically Accurate Scoring**: Proper handling of reverse-scored items, facet calculations, and trait aggregation
- **30 Facet Breakdown**: Detailed sub-trait analysis (6 facets per trait)

### Results & Insights

- **Comprehensive Reports**: Detailed trait interpretations with personalized insights
- **Personality Profile**: Unique personality pattern identification
- **Interesting Facts**: Research-backed facts about each trait level
- **Career Environments**: Suitable work environments based on your profile
- **Growth Tips**: Actionable suggestions for personal development
- **Relationship Insights**: How your traits influence relationships
- **Interactive Charts**: Radar and bar chart visualizations

### User Experience

- **Zen-Inspired Design**: Calming sage green theme with warm neutral tones
- **Minimal SVG Illustrations**: Custom-designed illustrations using the primary color palette
- **Mobile Responsive**: Fully optimized for all screen sizes
- **Pause & Resume**: Save your progress and continue later
- **PDF Export**: Download professional reports of your results
- **Privacy-First**: All data stored locally in your browser
- **Accessible**: Follows WCAG guidelines

## 🎨 Design System

The application features a serene, welcoming aesthetic:

- **Primary Color**: Sage green (`#627362`) with a full shade range
- **Typography**: Inter (sans-serif) for body, Lora (serif) for headings
- **Muted Trait Colors**: Soft, harmonious colors for each personality trait
- **Glass Effects**: Subtle backdrop blur and transparency
- **Smooth Animations**: Gentle fade-in, float, and breathe animations

## 🧠 The Big Five Traits

| Trait                 | Color       | Description                                       |
| --------------------- | ----------- | ------------------------------------------------- |
| **Openness**          | Soft Purple | Creativity, curiosity, and preference for novelty |
| **Conscientiousness** | Muted Green | Organization, dependability, and self-discipline  |
| **Extraversion**      | Warm Gold   | Sociability, assertiveness, and positive emotions |
| **Agreeableness**     | Soft Teal   | Cooperation, trust, and empathy                   |
| **Neuroticism**       | Dusty Rose  | Emotional sensitivity and stress response         |

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom zen color palette
- **Routing**: React Router v6
- **Charts**: Recharts
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Build**: Vite

## 🚀 Getting Started

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

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Layout.tsx           # Main layout with header/footer
│   ├── TraitChart.tsx       # Radar and bar chart visualizations
│   ├── FacetBreakdown.tsx   # Expandable facet detail views
│   ├── PDFReport.tsx        # PDF generation component
│   └── ZenIllustrations.tsx # Custom SVG illustrations
├── context/
│   └── TestContext.tsx      # Global state management
├── data/
│   └── questions.ts         # All 120 IPIP-NEO-120 items
├── lib/
│   ├── scoring.ts           # Scoring algorithm with reverse scoring
│   ├── interpretations.ts   # Trait/facet interpretations
│   ├── insights.ts          # Personalized insights generation
│   └── storage.ts           # Local storage utilities
├── pages/
│   ├── HomePage.tsx         # Landing page with illustrations
│   ├── TestPage.tsx         # Multi-step questionnaire (10 steps)
│   ├── ResultsPage.tsx      # Comprehensive results dashboard
│   └── AboutPage.tsx        # Information & ethical disclaimers
├── types/
│   └── index.ts             # TypeScript type definitions
├── index.css                # Global styles & zen theme utilities
├── App.tsx                  # Main app with routing
└── main.tsx                 # Entry point
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
