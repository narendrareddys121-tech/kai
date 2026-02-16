
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

// Export as CSV (Comma Separated Values)
export function exportAsCSV(analysis: ProductAnalysis, filename: string = 'kai-analysis.csv'): void {
  const rows: string[][] = [];
  
  // Header
  rows.push(['Field', 'Value']);
  rows.push(['Product Category', analysis.productIdentity.category]);
  rows.push(['Confidence', analysis.productIdentity.confidence]);
  rows.push(['Intelligence Score', `${analysis.score.value}/100`]);
  rows.push(['Score Interpretation', analysis.score.interpretation]);
  
  // Allergens
  if (analysis.allergens && analysis.allergens.length > 0) {
    analysis.allergens.forEach((allergen, i) => {
      rows.push([`Allergen ${i + 1}`, `${allergen.name} (${allergen.severity})`]);
    });
  }
  
  // Nutrition
  if (analysis.nutrition) {
    if (analysis.nutrition.calories) rows.push(['Calories', analysis.nutrition.calories]);
    if (analysis.nutrition.protein) rows.push(['Protein', analysis.nutrition.protein]);
    if (analysis.nutrition.carbs) rows.push(['Carbs', analysis.nutrition.carbs]);
    if (analysis.nutrition.fat) rows.push(['Fat', analysis.nutrition.fat]);
  }
  
  // Health Risk
  if (analysis.healthRisk) {
    rows.push(['Health Risk Score', `${analysis.healthRisk.score}/100`]);
    rows.push(['Health Risk Level', analysis.healthRisk.level]);
  }
  
  // Environmental Impact
  if (analysis.environmentalImpact) {
    rows.push(['Environmental Score', `${analysis.environmentalImpact.score}/100`]);
    rows.push(['Environmental Level', analysis.environmentalImpact.level]);
  }
  
  // Convert to CSV format
  const csvContent = rows.map(row => 
    row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  
  downloadFile(csvContent, filename, 'text/csv');
}

// Export as Markdown
export function exportAsMarkdown(analysis: ProductAnalysis, filename: string = 'kai-analysis.md'): void {
  const lines: string[] = [];
  
  lines.push('# kai Product Intelligence Report');
  lines.push('');
  lines.push(`**Generated:** ${new Date().toLocaleString()}`);
  lines.push('');
  
  // Product Identity
  lines.push('## Product Identity');
  lines.push(`- **Category:** ${analysis.productIdentity.category}`);
  lines.push(`- **Confidence:** ${analysis.productIdentity.confidence}`);
  lines.push(`- **Elements:** ${analysis.productIdentity.elements.join(', ')}`);
  lines.push('');
  
  // Score
  lines.push('## Intelligence Score');
  lines.push(`**${analysis.score.value}/100** - ${analysis.score.interpretation}`);
  lines.push('');
  
  // Executive Summary
  lines.push('## Executive Summary');
  lines.push(analysis.executiveSummary);
  lines.push('');
  
  // Positive Attributes
  lines.push('## Positive Attributes');
  analysis.positiveAttributes.forEach(attr => {
    lines.push(`- ${attr}`);
  });
  lines.push('');
  
  // Tradeoffs
  lines.push('## Tradeoffs & Limitations');
  analysis.tradeoffs.forEach(item => {
    lines.push(`- ${item}`);
  });
  lines.push('');
  
  // Allergens
  if (analysis.allergens && analysis.allergens.length > 0) {
    lines.push('## Allergen Information');
    analysis.allergens.forEach(allergen => {
      lines.push(`- **${allergen.name}** (${allergen.severity}): ${allergen.details}`);
    });
    lines.push('');
  }
  
  // Dietary Compatibility
  if (analysis.dietaryCompatibility && analysis.dietaryCompatibility.length > 0) {
    lines.push('## Dietary Compatibility');
    analysis.dietaryCompatibility.forEach(diet => {
      const icon = diet.compatible ? '✓' : '✗';
      lines.push(`- ${icon} **${diet.diet}**: ${diet.reason}`);
    });
    lines.push('');
  }
  
  // Nutrition
  if (analysis.nutrition) {
    lines.push('## Nutritional Information');
    if (analysis.nutrition.calories) lines.push(`- **Calories:** ${analysis.nutrition.calories}`);
    if (analysis.nutrition.protein) lines.push(`- **Protein:** ${analysis.nutrition.protein}`);
    if (analysis.nutrition.carbs) lines.push(`- **Carbs:** ${analysis.nutrition.carbs}`);
    if (analysis.nutrition.fat) lines.push(`- **Fat:** ${analysis.nutrition.fat}`);
    lines.push('');
  }
  
  // Health Risk
  if (analysis.healthRisk) {
    lines.push('## Health Risk Assessment');
    lines.push(`- **Score:** ${analysis.healthRisk.score}/100`);
    lines.push(`- **Level:** ${analysis.healthRisk.level}`);
    lines.push('- **Factors:**');
    analysis.healthRisk.factors.forEach(factor => {
      lines.push(`  - ${factor}`);
    });
    lines.push('');
  }
  
  // Environmental Impact
  if (analysis.environmentalImpact) {
    lines.push('## Environmental Impact');
    lines.push(`- **Score:** ${analysis.environmentalImpact.score}/100`);
    lines.push(`- **Level:** ${analysis.environmentalImpact.level}`);
    lines.push('- **Factors:**');
    analysis.environmentalImpact.factors.forEach(factor => {
      lines.push(`  - ${factor}`);
    });
    lines.push('');
  }
  
  // Alternatives
  if (analysis.alternatives && analysis.alternatives.length > 0) {
    lines.push('## Alternative Products');
    analysis.alternatives.forEach((alt, i) => {
      lines.push(`${i + 1}. ${alt}`);
    });
    lines.push('');
  }
  
  lines.push('---');
  lines.push('*Generated by kai - Cognitive Product Intelligence*');
  
  const mdContent = lines.join('\n');
  downloadFile(mdContent, filename, 'text/markdown');
}

// Export as HTML
export function exportAsHTML(analysis: ProductAnalysis, filename: string = 'kai-analysis.html'): void {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>kai Analysis: ${analysis.productIdentity.category}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #f8fafc;
      padding: 2rem;
    }
    .container { max-width: 900px; margin: 0 auto; background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #0f172a; }
    h2 { font-size: 1.5rem; margin: 2rem 0 1rem; color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
    .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 2rem; }
    .score { font-size: 3rem; font-weight: bold; color: #4f46e5; }
    .badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; margin-right: 0.5rem; }
    .badge-high { background: #dcfce7; color: #166534; }
    .badge-medium { background: #fef3c7; color: #92400e; }
    .badge-low { background: #fee2e2; color: #991b1b; }
    ul { margin-left: 1.5rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.5rem; }
    .summary { background: #f1f5f9; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
    .footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>kai Product Intelligence Report</h1>
    <div class="meta">Generated: ${new Date().toLocaleString()}</div>
    
    <h2>Product Identity</h2>
    <p><strong>Category:</strong> ${analysis.productIdentity.category}</p>
    <p><strong>Confidence:</strong> <span class="badge badge-${analysis.productIdentity.confidence.toLowerCase()}">${analysis.productIdentity.confidence}</span></p>
    
    <h2>Intelligence Score</h2>
    <div class="score">${analysis.score.value}/100</div>
    <p>${analysis.score.interpretation}</p>
    
    <h2>Executive Summary</h2>
    <div class="summary">${analysis.executiveSummary}</div>
    
    <h2>Positive Attributes</h2>
    <ul>
      ${analysis.positiveAttributes.map(attr => `<li>${attr}</li>`).join('')}
    </ul>
    
    <h2>Tradeoffs & Limitations</h2>
    <ul>
      ${analysis.tradeoffs.map(item => `<li>${item}</li>`).join('')}
    </ul>
    
    ${analysis.allergens && analysis.allergens.length > 0 ? `
      <h2>Allergen Information</h2>
      <ul>
        ${analysis.allergens.map(a => `<li><strong>${a.name}</strong> (${a.severity}): ${a.details}</li>`).join('')}
      </ul>
    ` : ''}
    
    ${analysis.healthRisk ? `
      <h2>Health Risk Assessment</h2>
      <p><strong>Score:</strong> ${analysis.healthRisk.score}/100 (${analysis.healthRisk.level})</p>
      <ul>
        ${analysis.healthRisk.factors.map(f => `<li>${f}</li>`).join('')}
      </ul>
    ` : ''}
    
    ${analysis.environmentalImpact ? `
      <h2>Environmental Impact</h2>
      <p><strong>Score:</strong> ${analysis.environmentalImpact.score}/100 (${analysis.environmentalImpact.level})</p>
      <ul>
        ${analysis.environmentalImpact.factors.map(f => `<li>${f}</li>`).join('')}
      </ul>
    ` : ''}
    
    <div class="footer">
      Generated by kai - Cognitive Product Intelligence
    </div>
  </div>
</body>
</html>`;
  
  downloadFile(html, filename, 'text/html');
}

// Copy full report to clipboard
export async function copyFullReport(analysis: ProductAnalysis): Promise<boolean> {
  const lines: string[] = [];
  
  lines.push(`kai ANALYSIS: ${analysis.productIdentity.category}`);
  lines.push(`Score: ${analysis.score.value}/100`);
  lines.push('');
  lines.push(analysis.executiveSummary);
  lines.push('');
  lines.push('POSITIVE ATTRIBUTES:');
  analysis.positiveAttributes.forEach(attr => lines.push(`• ${attr}`));
  lines.push('');
  lines.push('TRADEOFFS:');
  analysis.tradeoffs.forEach(item => lines.push(`• ${item}`));
  
  if (analysis.allergens && analysis.allergens.length > 0) {
    lines.push('');
    lines.push('ALLERGENS:');
    analysis.allergens.forEach(a => lines.push(`• ${a.name} (${a.severity})`));
  }
  
  if (analysis.healthRisk) {
    lines.push('');
    lines.push(`HEALTH RISK: ${analysis.healthRisk.level} (${analysis.healthRisk.score}/100)`);
  }
  
  if (analysis.environmentalImpact) {
    lines.push('');
    lines.push(`ENVIRONMENTAL: ${analysis.environmentalImpact.level} (${analysis.environmentalImpact.score}/100)`);
  }
  
  const fullReport = lines.join('\n');
  return await copyToClipboard(fullReport);
}

// Print report
export function printReport(): void {
  window.print();
}

// Download generated image
export function downloadImage(imageUrl: string, filename: string = 'kai-product-image.png'): void {
  if (!imageUrl) return;
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Email report via mailto
export function emailReport(analysis: ProductAnalysis): void {
  const subject = encodeURIComponent(`kai Analysis: ${analysis.productIdentity.category}`);
  const body = encodeURIComponent(
    `Intelligence Score: ${analysis.score.value}/100\n\n` +
    `${analysis.executiveSummary}\n\n` +
    `Generated by kai - Cognitive Product Intelligence`
  );
  
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
