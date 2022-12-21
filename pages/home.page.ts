import { expect, Locator, Page } from '@playwright/test';
export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * @param {string} url
     */
    async goToHomepage(url) {
        await this.page.goto(url);

        // Expect a title "to contain" a substring.
        await expect(this.page).toHaveTitle(/Coolblue/);
    }

    async acceptAllCookies() {
        const cookieBanner = this.page.getByRole('button', { name: 'Accepteer onze cookies' });
        await cookieBanner.click();
    }

    async clickCategroy() {
        const computerCategory = this.page.getByRole('button', { name: 'Computers & tablets' });
        await computerCategory.click();
    }

    /**
     * @param {string} catName
     */
    async clickSubCategoryWithName(catName) {
        const subCat = this.page.getByRole('link', { name: catName }).nth(1);
        await subCat.click();
    }

        /**
     * @param {string} laptopCat
     */
        async clickLaptopCatWithName(laptopCat) {
            const subCat = this.page.getByRole('link', { name: laptopCat }).first();
            await subCat.click();
        }
    
}