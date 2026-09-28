import { Page, Locator, test, expect } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}
export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];
  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'Api link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },

      {
        locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'),
        name: 'Lightmode icon',
      },

      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisability() {
    for (const { locator, name } of this.elements)
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements)
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
  }

  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements)
      if (attribute) {
        await test.step(`Проверка атрибутов href элемента ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
  }
  async clickSwitchModeIcon() {
    await this.page.getByLabel('Switch between dark and light').click();
  }
  async checkDataThemeAttributeValue() {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }
  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }
  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }
  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithdarkMode.webp`);
  }
  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithlightMode.webp`);
  }
}
