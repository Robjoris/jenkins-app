import { expect, Locator, Page } from '@playwright/test';
export class PdpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addProductToCart() {
        const productWithName = this.page.getByRole('button', { name: 'In mijn winkelwagen' });
        await productWithName.click();
    }
}