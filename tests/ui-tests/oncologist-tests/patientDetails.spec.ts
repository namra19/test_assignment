import { test, expect } from '@playwright/test';
import { loginAsOncologist } from '../../../utils/utils';
import { PatientsPage } from '../../../pages/PatientsPage';
import { PatientDetailsPage } from '../../../pages/PatientsDetailPage';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Oncologist - Patient Records', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('View patient demographics, history, labs, and referrals and add clinical notes', async ({ page }) => {
    const patientsPage = new PatientsPage(page);
    const patientDetails = new PatientDetailsPage(page);

    await loginAsOncologist(page);
    await expect(page).toHaveURL(/patients/);
    await patientsPage.openPatientByMRN('BP-10003');
    await expect(page).toHaveURL(/patients\/p3/);

    // Verify demographics
    await expect(patientDetails.patientRowByName).toBeVisible();
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

    // Add clinical note
    const note = "Patient responding well to immunotherapy";
    await patientDetails.addClinicalNote(note);
   // await expect(patientDetails.patientNote).toBeVisible();
  });

  
  });




