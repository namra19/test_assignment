import { test, expect, request } from '@playwright/test';
import { getAuthToken } from '../../utils/utils';

test.describe('RBAC Security Tests', () => {
  let oncologistToken: string;
  let radiologistToken: string;
  let apiContext: any;

  test.beforeAll(async () => {
    oncologistToken = await getAuthToken('oncologist');
    radiologistToken = await getAuthToken('radiologist');

    apiContext = await request.newContext({
      baseURL: 'http://localhost:8000/api',
    });
  });

  test('Oncologist cannot access radiologist-only endpoints', async () => {
    const res = await apiContext.get('/scans', {
      headers: { Authorization: `Bearer ${oncologistToken}` },
    });
    expect(res.status()).toBe(403);
  });

  test('Radiologist cannot access oncologist-only endpoints', async () => {
    const res = await apiContext.post('/patients/1/notes', {
      headers: { Authorization: `Bearer ${radiologistToken}` },
      data: { note: 'Test note' },
    });
    expect(res.status()).toBe(403);
  });

  test('Unauthenticated request is rejected', async () => {
    const res = await apiContext.get('/patients/1');
    expect(res.status()).toBe(401);
  });
});