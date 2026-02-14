<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Ljy9AwnF7e3uVtwlfeDQFCzZl9RKCsUD

## 🚀 What's New in v2.0

### Advanced AI Models
- **Text Analysis**: Upgraded to `gemini-2.0-flash-exp` - Google's latest experimental flash model with enhanced reasoning capabilities
- **Image Generation**: Now using `imagen-3.0-generate-001` for professional-grade product visualization with intelligent fallback to Gemini 2.0
- **Enhanced Scoring**: Sophisticated 0-100 intelligence scoring algorithm considering ingredient quality (40%), nutritional profile (30%), processing level (20%), and transparency (10%)

### Improved Analysis Features
- More detailed ingredient breakdown with scientific context
- Advanced awareness flags for allergens, controversial additives, and nutritional concerns
- Better error handling with specific, user-friendly messages
- Enhanced prompt engineering for more accurate and comprehensive insights
- Fallback mechanisms ensuring reliability even when primary models are unavailable

## Run Locally

**Prerequisites:**  Node.js (v18 or higher recommended)


1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local`:
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```
   
   Get your API key from: https://aistudio.google.com/apikey

3. Run the app:
   ```bash
   npm run dev
   ```
   
4. Open your browser to: http://localhost:3000

## Features

- 🔍 **Intelligent Product Analysis**: Deep ingredient breakdown with functional roles
- 🎨 **AI-Generated Product Images**: Professional studio-quality product visualization
- 📊 **Comprehensive Scoring**: Multi-factor quality assessment
- ⚠️ **Awareness Flags**: Automatic detection of allergens and controversial ingredients
- 💡 **Smart Suggestions**: Proactive recommendations for consumers
- 🧪 **Scientific Context**: Evidence-based explanations for ingredients and additives

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **AI Models**: 
  - Google Gemini 2.0 Flash Experimental
  - Imagen 3.0
- **Styling**: Tailwind CSS (via inline classes)

## Building for Production

```bash
npm run build
npm run preview
```
