import { test, expect } from '@playwright/test';
import { loginAsOncologist } from '../../../utils/utils';
import { PatientsPage } from '../../../pages/PatientsPage';
import { PatientDetailsPage } from '../../../pages/PatientsDetailPage';
import { LoginPage } from '../../../pages/LoginPage';

//Scenario: View patient demographics, history, labs, and referrals

// Navigate to patient list page

// Select a patient

// Verify patient demographics, medical history, lab results, and referrals are displayed correctly

// Validate that read-only fields are non-editable unless explicitly allowed
test.describe('Oncologist - Patient Data Management', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('View patient demographics, history, labs, and referrals and add clinical notes', async ({ page }) => {
    const patientsPage = new PatientsPage(page);
    const patientDetails = new PatientDetailsPage(page);

    await loginAsOncologist(page);
    await expect(page).toHaveURL(/patients/);
    // await patientsPage.openPatientByMRN('BP-10003');
    await patientsPage.searchPatient('BP-10003');
    await patientsPage.openSearchedPatient();

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

  });

  
  });



//Scenario: Add clinical notes

// Navigate to a patient’s record

// Add a new clinical note

// Verify note appears immediately in patient history

// Ensure timestamp and user identity are recorded correctly


// 1.2 Orders

// Scenario: Order imaging studies (CT/MRI)

// Open patient record

// Navigate to “Orders” section

// Select CT or MRI, fill in required fields, submit order

// Verify confirmation message and that order is added to patient’s order history

// Scenario: Order blood tests

// Similar steps as above but for blood tests

// Validate that non-Oncologist users cannot see or submit this option