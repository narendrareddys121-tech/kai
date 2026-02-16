<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# kai - Cognitive Product Intelligence

A sophisticated product label analysis engine that transforms raw ingredient text into actionable consumer insights using advanced AI powered by Google Gemini.

View your app in AI Studio: https://ai.studio/apps/drive/1Ljy9AwnF7e3uVtwlfeDQFCzZl9RKCsUD

## Features

- 🧾 Intelligent product identification and categorization
- ✨ Analysis of positive attributes and benefits
- ⚖ Balanced assessment of tradeoffs and limitations
- 🧪 Functional role explanation for ingredients
- 🏆 Quality and formulation insights
- 🚩 Consumer awareness flags
- 📅 Smart usage recommendations
- 🧠 Proactive suggestions
- 🎨 AI-powered visual synthesis of products

## Run Locally

**Prerequisites:**  Node.js (version 16 or higher)

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
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Get your API key from: https://aistudio.google.com/app/apikey

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

## Usage

1. Open the app in your browser
2. Paste raw product label text or ingredient list into the input field
3. Click "Analyze with kai" or use "Load Example" to try a sample
4. View comprehensive insights about the product

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **AI Engine**: Google Gemini API
- **Styling**: Tailwind CSS
- **Fonts**: Inter & JetBrains Mono

## License

© 2025 kai Cognitive Intelligence. Non-medical guidance only. Use responsibly.
