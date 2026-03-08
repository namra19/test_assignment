import { Page, Locator, expect } from '@playwright/test';
import { patientDetailPageLocators } from '../locators/patientDetailPageLocators';

export class PatientDetailsPage {

  readonly page: Page;

  readonly patientRowByName: Locator;
  readonly dob: Locator;
  readonly mrn: Locator;

  readonly medicalHistory: Locator;
  readonly labResultsTable: Locator;
  readonly referralsSection: Locator;

  readonly clinicalNotesSection: Locator;
  readonly clinicalNoteInput: Locator;
  readonly addNoteButton: Locator;
  readonly patientNote: Locator;
  constructor(page: Page) {
    this.page = page;

    this.patientRowByName = page.locator(patientDetailPageLocators.patientRowByName);
    this.dob = page.locator(patientDetailPageLocators.dob);
    this.mrn = page.locator(patientDetailPageLocators.mrn);

    this.medicalHistory = page.locator(patientDetailPageLocators.medicalHistory);
    this.labResultsTable = page.locator(patientDetailPageLocators.labResultsTable);
    this.referralsSection = page.locator(patientDetailPageLocators.referralsSection);

    this.clinicalNotesSection = page.locator(patientDetailPageLocators.clinicalNotesSection);
    this.clinicalNoteInput = page.locator(patientDetailPageLocators.clinicalNoteInput);
    this.addNoteButton = page.locator(patientDetailPageLocators.addNoteButton);
    this.patientNote = page.locator(patientDetailPageLocators.patientNote);
  }

  async addClinicalNote(note: string) {
    await this.clinicalNoteInput.fill(note);
    await this.addNoteButton.click();
  }

  async verifyLatestNote(noteText: string) {
    const latestNote = this.page.locator(patientDetailPageLocators.patientNote).first();
    await expect(latestNote).toContainText(noteText);
    await expect(latestNote).toContainText("Oncologist");
    const timestamp = latestNote.locator(patientDetailPageLocators.noteTimestamp);
    await expect(timestamp).toBeVisible();

  }
}