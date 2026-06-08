# Visual Regression & Accessibility Testing Suite

![Playwright Tests](https://github.com/Bigtourlantaop/visual-a11y-suite/actions/workflows/playwright.yml/badge.svg)

A professional QA automation framework built with Playwright and TypeScript, covering visual regression testing and WCAG 2.1 accessibility compliance.

## 🛠️ Tech Stack
- **Playwright** — Cross-browser test automation
- **TypeScript** — Type-safe test code
- **axe-core** — Accessibility testing (WCAG 2.1)
- **GitHub Actions** — CI/CD pipeline

## ✅ What This Tests
- Visual regression across Chrome, Firefox, and Safari
- Accessibility violations (critical, serious, moderate)
- 3 key pages: Homepage, Login Error, Product Page

## 🚀 Getting Started
```bash
git clone https://github.com/Bigtourlantaop/visual-a11y-suite.git
cd visual-a11y-suite
npm install
npx playwright install
npx playwright test
```

## 📊 Test Report
```bash
npx playwright show-report
```