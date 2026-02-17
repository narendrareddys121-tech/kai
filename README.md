<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# kai - Cognitive Product Intelligence

> **A world-class consumer intelligence platform** that transforms raw product labels into comprehensive, actionable insights using advanced AI powered by Google Gemini.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

View your app in AI Studio: https://ai.studio/apps/drive/1Ljy9AwnF7e3uVtwlfeDQFCzZl9RKCsUD

---

## ✨ Features

### 🧠 Advanced AI Analysis
- **Intelligent Product Identification** - Automatic categorization with confidence levels
- **Allergen Detection** - Identify common allergens with severity levels (Confirmed/Possible/Trace)
- **Dietary Compatibility** - Check compatibility with Vegan, Keto, Paleo, Halal, Kosher, and more
- **Nutritional Breakdown** - Parse and visualize calories, macros, vitamins, and minerals
- **Health Risk Assessment** - Comprehensive 1-100 risk scoring with detailed factors
- **Environmental Impact Score** - Sustainability and eco-friendliness evaluation
- **Ingredient Toxicity Flags** - Research-backed concerns for harmful additives
- **Alternative Suggestions** - AI-generated healthier product alternatives
- **Category Benchmarking** - Compare against typical products in the same category

### 🎨 Beautiful UI/UX
- **Dark Mode** - Smooth theme switching with system preference detection
- **Animated Score Gauges** - Pure CSS/SVG circular gauges for visual scoring
- **Color-Coded Displays** - Allergen panels, dietary badges, ingredient heatmaps
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Loading Animations** - Beautiful skeleton loaders with progress indicators
- **Toast Notifications** - Non-intrusive success/error/info messages

### 🎤 Multiple Input Modes
- **Text Input** - Traditional copy-paste with character/word count
- **Voice Input** - Real-time speech recognition with transcript display
- **Camera Capture** - Take photos of product labels (camera access required)
- **Example Templates** - Pre-loaded examples for food, cosmetics, medicine, cleaning products

### 📊 Advanced Visualizations
- **Score Gauges** - Intelligence Score, Health Safety, Environmental Impact
- **Nutrition Charts** - Bar-style visualization of nutritional data
- **Ingredient Heatmap** - Color-coded risk assessment (green/yellow/red)
- **Dietary Badges** - Visual compatibility grid with icons
- **Allergen Panels** - Severity-coded allergen information cards

### 🗂️ History & Export
- **Analysis History** - Save up to 50 past analyses with search/filter
- **Export as JSON** - Download full analysis data
- **Export as Text** - Formatted plain text report
- **Copy to Clipboard** - One-click executive summary copy
- **Web Share API** - Native sharing on supported devices

### ⌨️ Keyboard Shortcuts
- `Ctrl+Enter` - Analyze product
- `Ctrl+K` - Clear input
- `Ctrl+D` - Toggle dark mode
- `Ctrl+M` - Toggle voice input
- `Esc` - Close modals

---

## 🚀 Run Locally

### Prerequisites
- Node.js (version 16 or higher)
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/narendrareddys121-tech/kai.git
   cd kai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at: http://localhost:3000

5. **Build for production** (optional)
   ```bash
   npm run build
   npm run preview
   ```

---

## 📖 Usage Guide

### Basic Analysis
1. Open the app in your browser
2. Choose an input mode: **Text**, **Voice**, or **Camera**
3. Enter or capture product label information
4. Click "Analyze with kai" or press `Ctrl+Enter`
5. Explore comprehensive insights and visualizations

### Voice Input
1. Click the **Voice** tab
2. Click the microphone button to start recording
3. Speak the product label text clearly
4. Click stop when finished
5. Review the transcript and analyze

### Camera Capture
1. Click the **Camera** tab
2. Click "Start Camera" and allow camera access
3. Point at the product label
4. Click "Capture Photo"
5. Review and use the captured image

### History & Export
- Click the history icon (top right) to view past analyses
- Click the export button to download or share results
- Use the search bar to filter history by keywords

---

## 🏗️ Architecture

```
kai/
├── components/          # React components
│   ├── AnalysisResult.tsx       # Main results display with all panels
│   ├── ScoreGauge.tsx           # Animated circular score gauges
│   ├── AllergenPanel.tsx        # Allergen detection display
│   ├── DietaryBadges.tsx        # Dietary compatibility grid
│   ├── NutritionChart.tsx       # Nutrition visualization
│   ├── IngredientHeatmap.tsx    # Color-coded ingredient risks
│   ├── ComparisonPanel.tsx      # Category benchmarking
│   ├── AnalysisHistory.tsx      # History sidebar
│   ├── LoadingSkeleton.tsx      # Loading animations
│   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   ├── CameraCapture.tsx        # Camera input modal
│   ├── Toast.tsx                # Notification system
│   └── ExportMenu.tsx           # Export options menu
├── hooks/               # Custom React hooks
│   ├── useTheme.ts              # Dark mode management
│   ├── useVoiceInput.ts         # Speech recognition
│   └── useAnalysisHistory.ts    # History management
├── services/            # Business logic
│   ├── geminiService.ts         # Gemini AI integration
│   └── exportService.ts         # Export/share functions
├── constants.ts         # App-wide constants
├── utils.ts            # Helper utilities
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main application component
└── index.tsx           # React entry point
```

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) with TypeScript
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/gemini-api)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Browser APIs**: Web Speech API, getUserMedia, Web Share API

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript with strict typing
- Follow existing component patterns
- Add dark mode support for new components
- Use Tailwind CSS for styling (no custom CSS)
- Write descriptive commit messages

---

## 📄 License & Disclaimer

© 2025 kai Cognitive Intelligence

**⚠️ Important Disclaimer:**
- This tool provides **informational analysis only**
- **NOT** a substitute for professional medical, dietary, or nutritional advice
- Always consult qualified professionals for health-related decisions
- Verify product information with manufacturers
- Use responsibly and at your own discretion

---

## 🐛 Troubleshooting

### Camera Access Issues
- Ensure HTTPS or localhost is used (required for camera access)
- Check browser camera permissions
- Try a different browser if issues persist

### Voice Input Not Working
- Check microphone permissions in browser settings
- Supported browsers: Chrome, Edge, Safari (partial)
- Firefox requires additional configuration

### API Errors
- Verify your Gemini API key is correct in `.env.local`
- Check API quota limits in Google AI Studio
- Ensure stable internet connection
- The app includes automatic retry logic for transient failures

---

## 🚀 Recent Improvements

### v1.2 Updates
- ✅ Fixed Gemini API integration with correct model names
- ✅ Fixed image generation using Imagen 3.0 model
- ✅ Added retry logic with exponential backoff for API calls
- ✅ Improved error handling with user-friendly messages
- ✅ Optimized bundle size (555KB → 237KB main bundle)
- ✅ Implemented code splitting with lazy loading
- ✅ Added PWA support with manifest.json
- ✅ Enhanced input validation and sanitization
- ✅ Improved SEO with meta tags
- ✅ Better API key validation and warnings

---

## 📸 Screenshots

*Coming soon - UI screenshots showcasing dark mode, analysis results, and interactive features*

---

Made with ❤️ by the kai team
