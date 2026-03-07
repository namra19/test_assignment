import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';

test.describe('MedTrack Portal Login', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Oncologist Login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            users.oncologist.username,
            users.oncologist.password
        );

        await expect(page).toHaveURL(/patients/);
    });

 test('Radiologist Login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            users.radiologist.username,
            users.radiologist.password
        );

        await expect(page).toHaveURL(/patients/);
    });

     test('Invalid Login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            users.invalidUser.username,
            users.invalidUser.password
        );

        await expect(page).toHaveURL(/login/);
    });

});



