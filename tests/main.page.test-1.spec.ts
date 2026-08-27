import { test, expect } from '@playwright/test';

test('Проверка названия элементов навигации хедера', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect
    .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
    .toContainText('Playwright');
  await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
});

test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  (await expect
    .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
    .toHaveAttribute('href', '/'),
    await expect
      .soft(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('href', '/docs/intro'));

  await expect
    .soft(page.getByRole('link', { name: 'API' }))
    .toHaveAttribute('href', '/docs/api/class-playwright');
  await expect
    .soft(page.getByLabel('GitHub repository'))
    .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
  await expect
    .soft(page.getByLabel('Discord server'))
    .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
});
test('Проверка переключения лайт мода', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByLabel('Switch between dark and light').click();
  await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
test('Проверка заголовка страницы', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect
    .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
    .toBeVisible();
  await expect
    .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
    .toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.',
    );
});
test('Проверка кнопки get started', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
  await expect
    .soft(page.getByRole('link', { name: 'Get started' }))
    .toHaveAttribute('href', '/docs/intro');
});
