import { expect, Locator, Page } from '@playwright/test';
export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectAProductInTheCart() {
        const amountInCart = await this.page.locator('.js-coolbar-shopping-cart-quantity-count > .badge').textContent();
        expect(amountInCart).toBe("1");
    }
}