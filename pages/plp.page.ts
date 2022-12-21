import { expect, Locator, Page } from '@playwright/test';
export class PlpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickRandomProduct() {
        for (const randomProduct of await this.page.locator('.product-grid__card > .product-card').all())
            console.log("length of all ", randomProduct.count());
            // randomProduct.click();
    }

    async clickProduct() {
        const productWithName = this.page.locator('.product-grid__card > .product-card').first();
        await productWithName.click();
    }
}