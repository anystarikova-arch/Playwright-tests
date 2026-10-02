import { test } from '../fixtures/mainPage';

test.describe('тесты главной страницы Playwright', () => {
  test('Проверка отображения элементов главной страницы', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test('Проверка названия элементов главной страницы', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка переключения темы', async ({ mainPage }) => {
    await test.step('Проверка начального системного режима', async () => {
      await mainPage.checkSwitchModeIconState('system');
    });
    await test.step('Переключение на светлую тему', async () => {
      await mainPage.clickSwitchModeIcon();
      await mainPage.checkSwitchModeIconState('light');
      await mainPage.checkDataThemeAttributeValue('light');
    });
    await test.step('Переключение на темную тему', async () => {
      await mainPage.clickSwitchModeIcon();
      await mainPage.checkSwitchModeIconState('dark');
      await mainPage.checkDataThemeAttributeValue('dark');
    });
  });

  for (const theme of ['light', 'dark'] as const) {
    test(`Проверка стилей с ${theme === 'light' ? 'светлой' : 'темной'} темой`, async ({ mainPage }) => {
      await test.step(`Установка ${theme === 'light' ? 'светлой' : 'темной'} темы`, async () => {
        await mainPage.setColorScheme(theme);
      });
      await test.step('Скриншотная проверка', async () => {
        await mainPage.checkLayout(theme);
      });
    });
  }
});
