import { test, expect } from '@playwright/test';
import { loginAsOncologist } from '../../../utils/utils';
import { PatientsPage } from '../../../pages/PatientsPage';
import { PatientDetailsPage } from '../../../pages/PatientsDetailPage';
import { LoginPage } from '../../../pages/LoginPage';
import { patientDetailPageLocators } from '../../../locators/patientDetailPageLocators';


test.describe('Oncologist - Patient Data Management', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('View patient demographics, history, labs, and referrals and add clinical notes', async ({ page }) => {
    const patientsPage = new PatientsPage(page);
    const patientDetails = new PatientDetailsPage(page);

    await loginAsOncologist(page);
    await patientsPage.searchPatient('AH-10009');
    await patientsPage.openSearchedPatient();

    // Verify demographics
    await expect(patientDetails.dob).toBeVisible();
    await expect(patientDetails.mrn).toBeVisible();

    await expect(patientDetails.dob).not.toHaveAttribute('contenteditable', 'true');
    await expect(patientDetails.mrn).not.toHaveAttribute('contenteditable', 'true');

    // Verify medical history
    await expect(patientDetails.medicalHistory).toBeVisible();

    // Verify lab results
    await expect(patientDetails.labResultsTable).toBeVisible();

    // Verify referrals
    await expect(patientDetails.referralsSection).toBeVisible();
  });

});

test("Add clinical note and verify timestamp", async ({ page }) => {

  const patientsPage = new PatientsPage(page);
  await loginAsOncologist(page);
  await patientsPage.searchPatient('AH-10009');
  await patientsPage.openSearchedPatient();
  const note = "Patient responding well to immunotherapy";
  await page.fill(patientDetailPageLocators.clinicalNoteInput, note);
  await page.click(patientDetailPageLocators.addNoteButton);

  //Verify note appears in patient history
  const latestNote = page.locator(patientDetailPageLocators.patientNote, {
    hasText: note
  }).first();

  await expect(latestNote).toBeVisible();

});

test("Add orders", async ({ page }) => {
  
  const patientsPage = new PatientsPage(page);
  await loginAsOncologist(page);
  await patientsPage.searchPatient('AH-10009');
  await patientsPage.openSearchedPatient();
  await page.selectOption(patientDetailPageLocators.orderInput, "CT");
  await page.click(patientDetailPageLocators.createOrderButton);

});



