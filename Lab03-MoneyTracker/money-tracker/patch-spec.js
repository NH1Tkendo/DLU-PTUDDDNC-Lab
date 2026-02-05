const fs = require('fs');
const path = require('path');

// Patch file spec to add standalone: false to MockTransactionItemComponent
const specPath = path.join(__dirname, 'src/app/home/home.page.spec.ts');

try {
  if (!fs.existsSync(specPath)) {
    console.log('[PATCH] Spec file not found, skipping patch');
    process.exit(0);
  }
  
  let content = fs.readFileSync(specPath, 'utf-8');
  
  // Check if file contains MockTransactionItemComponent
  if (content.includes('MockTransactionItemComponent')) {
    // Check if standalone property is missing
    const hasStandalone = /(@Component\s*\(\s*\{[^}]*selector\s*:\s*['"]app-transaction-item['"][^}]*standalone\s*:)/s.test(content);
    
    if (!hasStandalone) {
      console.log('[PATCH] Adding standalone: false to MockTransactionItemComponent...');
      
      // Find the @Component decorator for MockTransactionItemComponent and add standalone: false
      content = content.replace(
        /(@Component\s*\(\s*\{[\s\S]*?selector\s*:\s*['"]app-transaction-item['"][\s\S]*?template\s*:[\s\S]*?['"][\s\S]*?['"])\s*(\}\s*\))/,
        "$1,\n  standalone: false\n$2"
      );
      
      fs.writeFileSync(specPath, content);
      console.log('[PATCH] Successfully patched home.page.spec.ts');
    } else {
      console.log('[PATCH] MockTransactionItemComponent already has standalone property');
    }
  } else {
    console.log('[PATCH] MockTransactionItemComponent not found in spec file');
  }
} catch (error) {
  console.error('[PATCH] Error:', error.message);
  // Don't fail the build
  process.exit(0);
}
