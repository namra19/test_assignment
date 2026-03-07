import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

export async function loginAsOncologist(page: Page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.oncologist.username,
        users.oncologist.password
        
    );
}

export async function loginAsRadiologist(page: Page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.radiologist.username,
        users.radiologist.password
    );
}