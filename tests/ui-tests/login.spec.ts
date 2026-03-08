import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';
import { loginAsOncologist } from '../../utils/utils';
import { loginAsRadiologist } from '../../utils/utils';

test.describe('MedTrack Portal Login', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Oncologist Login', async ({ page }) => {
        await loginAsOncologist(page);
        await expect(page).toHaveURL(/patients/);
    });

 test('Radiologist Login', async ({ page }) => {
        await loginAsRadiologist(page);
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



