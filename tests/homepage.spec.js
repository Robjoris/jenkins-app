// @ts-check
const { test, expect } = require('@playwright/test');

test('I accept all cookies', async ({ page }) => {
  await page.goto('https://www.coolblue.be/nl');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Coolblue/);

  // Click accept cookies
  const cookieBanner = page.locator("button[aria-label='Accepteer onze cookies']");
  await cookieBanner.click();

  expect(cookieBanner).not.toBeVisible;
});

test('I click on the first windows laptop', async ({ page }) => {
  await page.goto('https://www.coolblue.be/nl');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Coolblue/);

  // Click accept cookies
  const cookieBanner = page.locator("button[aria-label='Accepteer onze cookies']");
  await cookieBanner.click();
  
  // Click category
  const computerCategory = page.locator("li:nth-of-type(1) > .collapsible-panel--header-text.js-category-navigation-button.navigation-bar__button");
  await computerCategory.click();

  const laptopSubCat = page.locator("li:nth-of-type(1) .product-category-navigation__list > li:nth-of-type(1) > ul > li:nth-of-type(1) > .category-navigation__link.category-navigation__link--black");
  await laptopSubCat.click();

  const windowsLaptop = page.locator("div[title='Windows laptops']  .card__title");
  await windowsLaptop.click();

  const allWindowsLaptop = page.locator("div[title='Alle Windows laptops']  .card__title");
  await allWindowsLaptop.click();

  //Click a product
  const firstWindowsLaptop = page.locator("div:nth-of-type(1) > .product-grid__card .button.button--order.js-add-to-cart-button");
  await firstWindowsLaptop.click();

  const lookBasket = page.locator(".col--3\@md.col--4.hide\@sm-down");
  expect(lookBasket).toBeVisible;
});

