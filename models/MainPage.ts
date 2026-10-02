import { Page, Locator, test, expect } from '@playwright/test';

type Theme = 'light' | 'dark';

interface Elements {
  locator: Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}
export class MainPage {
  readonly page: Page;
  readonly switchModeIcon: Locator;
  readonly elements: Elements[];
  constructor(page: Page) {
    this.page = page;
    const navigation = page.getByRole('navigation', { name: 'Main' });
    this.switchModeIcon = page.getByLabel('Switch between dark and light');
    this.elements = [
      {
        locator: navigation.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: navigation.getByRole('link', { name: 'Docs', exact: true }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: navigation.getByRole('link', { name: 'API', exact: true }),
        name: 'Api link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: this.switchModeIcon,
        name: 'Lightmode icon',
      },
      {
        locator: page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      },
      {
        locator: page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('/');
  }
  async checkElementsVisibility() {
    for (const { locator, name } of this.elements)
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator).toBeVisible();
      });
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements)
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator).toContainText(text);
        });
      }
  }

  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements)
      if (attribute) {
        await test.step(`Проверка атрибутов href элемента ${name}`, async () => {
          await expect.soft(locator).toHaveAttribute(attribute.type, attribute.value);
        });
      }
  }
  async clickSwitchModeIcon() {
    await this.switchModeIcon.click();
  }
  // The toggle cycles system -> light -> dark -> system.
  async checkSwitchModeIconState(mode: 'system' | Theme) {
    await expect(this.switchModeIcon).toHaveAttribute('aria-label', new RegExp(`currently ${mode} mode`));
  }
  async checkDataThemeAttributeValue(theme: Theme) {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', theme);
  }
  async setColorScheme(theme: Theme) {
    await this.page.emulateMedia({ colorScheme: theme });
    // The site reads prefers-color-scheme only on load.
    await this.page.reload();
    await this.checkDataThemeAttributeValue(theme);
  }
  async checkLayout(theme: Theme) {
    await expect(this.page).toHaveScreenshot(`pageWith-${theme}-Mode.png`, {
      // Above-the-fold only: content further down the live site changes often.
      fullPage: false,
      maxDiffPixelRatio: 0.01,
      mask: [this.page.getByRole('link', { name: /stargazers on GitHub/ })],
    });
  }
}
