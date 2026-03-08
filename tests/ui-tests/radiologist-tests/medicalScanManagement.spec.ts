import { test, expect } from '@playwright/test';
import { loginAsRadiologist } from '../../../utils/utils';
import { PatientsPage } from '../../../pages/PatientsPage';
import { PatientDetailsPage } from '../../../pages/PatientsDetailPage';
import { LoginPage } from '../../../pages/LoginPage';
import { patientDetailPageLocators } from '../../../locators/patientDetailPageLocators';
import path from 'path';


test.describe('Radiologist - Medical Scan Management', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Upload scan, set volume and date and add comment', async ({ page }) => {
    const patientsPage = new PatientsPage(page);
    const patientDetails = new PatientDetailsPage(page);

    await loginAsRadiologist(page);
    await patientsPage.searchPatient('WP-10010');
    await patientsPage.openSearchedPatient();

    // Verify demographics
    await expect(patientDetails.dob).toBeVisible();
    await expect(patientDetails.mrn).toBeVisible();

    // Upload scan
    await page.click(patientDetailPageLocators.uploadScanButton);
    const filePath = path.resolve('test-data/valid-scan.jpg');
    await patientDetails.uploadScan(filePath);

    //set volume and date
    await page.click(patientDetailPageLocators.scanVolumeAndDateBtn);
    await page.fill(patientDetailPageLocators.scanVolumeInput, "100");
    await page.fill(patientDetailPageLocators.scanDateInput, "2023-01-01");
    await page.waitForTimeout(3000);

    // Add comment
    await patientDetails.addScanComment("Initial scan for review");
  });






});




