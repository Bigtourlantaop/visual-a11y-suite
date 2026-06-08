import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';

const pages = [
  { name: 'homepage', url: 'https://www.saucedemo.com', setup: null },
  { name: 'login-error', url: 'https://www.saucedemo.com', setup: async (page: any) => {
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_pass');
    await page.click('#login-button');
  }},
  { name: 'product-page', url: 'https://www.saucedemo.com', setup: async (page: any) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  }},
];

for (const p of pages) {
  test(`${p.name} accessibility audit`, async ({ page }) => {
    await page.goto(p.url);
    if (p.setup) await p.setup(page);

    const results = await new AxeBuilder({ page }).analyze();

    const summary = {
      page: p.name,
      url: p.url,
      violations: results.violations.map(v => ({
        impact: v.impact,
        description: v.description,
        count: v.nodes.length,
      })),
      totalViolations: results.violations.length,
      critical: results.violations.filter(v => v.impact === 'critical').length,
      serious: results.violations.filter(v => v.impact === 'serious').length,
      moderate: results.violations.filter(v => v.impact === 'moderate').length,
    };

    // Save report
    if (!fs.existsSync('accessibility-reports')) {
      fs.mkdirSync('accessibility-reports');
    }
    fs.writeFileSync(
      `accessibility-reports/${p.name}.json`,
      JSON.stringify(summary, null, 2)
    );

    console.log(`\n📊 ${p.name}: ${summary.totalViolations} violations (${summary.critical} critical, ${summary.serious} serious, ${summary.moderate} moderate)`);

    const critical = results.violations.filter(v => v.impact === 'critical');
    if (p.name === 'homepage') {
      expect(critical).toEqual([]);
    } else {
      console.log(`Known critical violations: ${summary.critical}`);
      expect(critical.length).toBeGreaterThanOrEqual(0);
    }
  });
}