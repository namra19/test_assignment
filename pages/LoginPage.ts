import { Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
    constructor(private readonly page: Page) { }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.page.fill(loginLocators.usernameInput, username);
        await this.page.fill(loginLocators.passwordInput, password);
        await this.page.click(loginLocators.signinButton);
    }

     async getErrorMessage() {
    return this.page.textContent(loginLocators.errorMessage);
  }

}
