import { expect, Page, request } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

export async function loginAsOncologist(page: Page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.oncologist.username,
        users.oncologist.password
        
        
    );
    await expect(page).toHaveURL(/patients/);
}

export async function loginAsRadiologist(page: Page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.radiologist.username,
        users.radiologist.password
    );
    await expect(page).toHaveURL(/patients/);
}

//for API tests, we need to get auth tokens for both roles
export async function getAuthToken(role: 'oncologist' | 'radiologist') {
  const credentials = {
    oncologist: { username: 'dr.smith', password: 'oncologist123' },
    radiologist: { username: 'dr.jones', password: 'radiologist123' },
  };

  const response = await (await request.newContext()).post('http://localhost:8000/auth/login', {
    data: credentials[role],
  });

  const body = await response.json();
  return body.access_token; // assuming JWT returned as access_token
}