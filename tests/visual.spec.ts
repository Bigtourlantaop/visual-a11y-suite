import { test, expect } from '@playwright/test';

test('homepage visual snapshot', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('login page after failed login visual snapshot', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_pass');
  await page.click('#login-button');
  await expect(page).toHaveScreenshot('login-error.png');
});

test('product page visual snapshot', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveScreenshot('product-page.png');
});