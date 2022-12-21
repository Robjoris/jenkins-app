// @ts-check
const { test, expect } = require('@playwright/test');
const homePageUrl = 'https://www.coolblue.be/nl';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { PdpPage } from '../pages/pdp.page';
import { PlpPage } from '../pages/plp.page';

test('I order a random windows laptop', async ({ page }) => {
  const homePage = new HomePage(page);
  const plpPage = new PlpPage(page);
  const pdpPage = new PdpPage(page);
  const cartPage = new CartPage(page);

  //go to given homepage
  await homePage.goToHomepage(homePageUrl);

  // Click accept cookies
  await homePage.acceptAllCookies();
  
  // Click category
  await homePage.clickCategroy();
  await homePage.clickSubCategoryWithName('Laptops');
  await homePage.clickSubCategoryWithName('Windows laptops');
  await homePage.clickLaptopCatWithName('Alle Windows laptops');

  //Click a product
  await plpPage.clickProduct();
  // await plpPage.clickRandomProduct();

  //Add product to cart
  await pdpPage.addProductToCart();
  await cartPage.expectAProductInTheCart();
});
