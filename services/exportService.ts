
import { ProductAnalysis } from '../types';
import { downloadFile, copyToClipboard, shareContent } from '../utils';

// Export analysis as JSON file
export function exportAsJSON(analysis: ProductAnalysis, filename: string = 'kai-analysis.json'): void {
  const jsonContent = JSON.stringify(analysis, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
}

// Export analysis as formatted text report
export function exportAsText(analysis: ProductAnalysis, filename: string = 'kai-analysis.txt'): void {
  const lines: string[] = [];
  
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('          kai PRODUCT INTELLIGENCE REPORT');
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('');
  
  // Product Identity
  lines.push('PRODUCT IDENTITY');
  lines.push('─────────────────────────────────────────────────────');
  lines.push(`Category: ${analysis.productIdentity.category}`);
  lines.push(`Confidence: ${analysis.productIdentity.confidence}`);
  lines.push(`Elements: ${analysis.productIdentity.elements.join(', ')}`);
  lines.push('');
  
  // Score
  lines.push('INTELLIGENCE SCORE');
  lines.push('─────────────────────────────────────────────────────');
  lines.push(`Score: ${analysis.score.value}/100`);
  lines.push(`Rating: ${analysis.score.interpretation}`);
  lines.push('');
  
  // Executive Summary
  lines.push('EXECUTIVE SUMMARY');
  lines.push('─────────────────────────────────────────────────────');
  lines.push(analysis.executiveSummary);
  lines.push('');
  
  // Positive Attributes
  lines.push('POSITIVE ATTRIBUTES');
  lines.push('─────────────────────────────────────────────────────');
  analysis.positiveAttributes.forEach((attr, i) => {
    lines.push(`${i + 1}. ${attr}`);
  });
  lines.push('');
  
  // Tradeoffs
  lines.push('TRADEOFFS & LIMITATIONS');
  lines.push('─────────────────────────────────────────────────────');
  analysis.tradeoffs.forEach((item, i) => {
    lines.push(`${i + 1}. ${item}`);
  });
  lines.push('');
  
  // Allergens
  if (analysis.allergens && analysis.allergens.length > 0) {
    lines.push('ALLERGEN INFORMATION');
    lines.push('─────────────────────────────────────────────────────');
    analysis.allergens.forEach(allergen => {
      lines.push(`• ${allergen.name} (${allergen.severity}): ${allergen.details}`);
    });
    lines.push('');
  }
  
  // Dietary Compatibility
  if (analysis.dietaryCompatibility && analysis.dietaryCompatibility.length > 0) {
    lines.push('DIETARY COMPATIBILITY');
    lines.push('─────────────────────────────────────────────────────');
    analysis.dietaryCompatibility.forEach(diet => {
      const icon = diet.compatible ? '✓' : '✗';
      lines.push(`${icon} ${diet.diet}: ${diet.reason}`);
    });
    lines.push('');
  }
  
  // Nutrition
  if (analysis.nutrition) {
    lines.push('NUTRITIONAL INFORMATION');
    lines.push('─────────────────────────────────────────────────────');
    if (analysis.nutrition.calories) lines.push(`Calories: ${analysis.nutrition.calories}`);
    if (analysis.nutrition.protein) lines.push(`Protein: ${analysis.nutrition.protein}`);
    if (analysis.nutrition.carbs) lines.push(`Carbohydrates: ${analysis.nutrition.carbs}`);
    if (analysis.nutrition.fat) lines.push(`Fat: ${analysis.nutrition.fat}`);
    if (analysis.nutrition.fiber) lines.push(`Fiber: ${analysis.nutrition.fiber}`);
    if (analysis.nutrition.sugar) lines.push(`Sugar: ${analysis.nutrition.sugar}`);
    if (analysis.nutrition.sodium) lines.push(`Sodium: ${analysis.nutrition.sodium}`);
    lines.push('');
  }
  
  // Health Risk
  if (analysis.healthRisk) {
    lines.push('HEALTH RISK ASSESSMENT');
    lines.push('─────────────────────────────────────────────────────');
    lines.push(`Risk Score: ${analysis.healthRisk.score}/100`);
    lines.push(`Risk Level: ${analysis.healthRisk.level}`);
    lines.push('Risk Factors:');
    analysis.healthRisk.factors.forEach(factor => {
      lines.push(`  • ${factor}`);
    });
    lines.push('');
  }
  
  // Environmental Impact
  if (analysis.environmentalImpact) {
    lines.push('ENVIRONMENTAL IMPACT');
    lines.push('─────────────────────────────────────────────────────');
    lines.push(`Impact Score: ${analysis.environmentalImpact.score}/100`);
    lines.push(`Impact Level: ${analysis.environmentalImpact.level}`);
    lines.push('Factors:');
    analysis.environmentalImpact.factors.forEach(factor => {
      lines.push(`  • ${factor}`);
    });
    lines.push('');
  }
  
  // Functional Ingredients
  lines.push('FUNCTIONAL INGREDIENTS');
  lines.push('─────────────────────────────────────────────────────');
  analysis.functionalIngredients.forEach(item => {
    lines.push(`• ${item.ingredient}: ${item.purpose}`);
  });
  lines.push('');
  
  // Quality Signals
  lines.push('QUALITY SIGNALS');
  lines.push('─────────────────────────────────────────────────────');
  lines.push(analysis.qualitySignals);
  lines.push('');
  
  // Awareness Flags
  lines.push('AWARENESS FLAGS');
  lines.push('─────────────────────────────────────────────────────');
  if (analysis.awarenessFlags.length > 0) {
    analysis.awarenessFlags.forEach(flag => {
      lines.push(`⚠ ${flag}`);
    });
  } else {
    lines.push('No significant flags detected.');
  }
  lines.push('');
  
  // Smart Usage
  lines.push('SMART USAGE PERSPECTIVE');
  lines.push('─────────────────────────────────────────────────────');
  lines.push(analysis.smartUsage);
  lines.push('');
  
  // Proactive Suggestion
  lines.push('PROACTIVE SUGGESTION');
  lines.push('─────────────────────────────────────────────────────');
  lines.push(analysis.proactiveSuggestion);
  lines.push('');
  
  // Alternatives
  if (analysis.alternatives && analysis.alternatives.length > 0) {
    lines.push('ALTERNATIVE PRODUCTS');
    lines.push('─────────────────────────────────────────────────────');
    analysis.alternatives.forEach((alt, i) => {
      lines.push(`${i + 1}. ${alt}`);
    });
    lines.push('');
  }
  
  // Comparison Data
  if (analysis.comparisonData) {
    lines.push('CATEGORY COMPARISON');
    lines.push('─────────────────────────────────────────────────────');
    lines.push(`Category: ${analysis.comparisonData.category}`);
    lines.push(`Benchmark: ${analysis.comparisonData.benchmark}`);
    lines.push(`vs Average: ${analysis.comparisonData.vsAverage}`);
    lines.push('');
  }
  
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('Generated by kai - Cognitive Product Intelligence');
  lines.push(`Report Date: ${new Date().toLocaleString()}`);
  lines.push('═══════════════════════════════════════════════════════');
  
  const textContent = lines.join('\n');
  downloadFile(textContent, filename, 'text/plain');
}

// Copy executive summary to clipboard
export async function copyExecutiveSummary(analysis: ProductAnalysis): Promise<boolean> {
  const summary = `${analysis.productIdentity.category} - Score: ${analysis.score.value}/100\n\n${analysis.executiveSummary}`;
  return await copyToClipboard(summary);
}

// Share via Web Share API
export async function shareAnalysis(analysis: ProductAnalysis): Promise<boolean> {
  const shareData = {
    title: `kai Analysis: ${analysis.productIdentity.category}`,
    text: `Intelligence Score: ${analysis.score.value}/100\n\n${analysis.executiveSummary}`,
  };
  
  return await shareContent(shareData);
}
