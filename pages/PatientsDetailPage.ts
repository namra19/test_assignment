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

  readonly uploadScanButton: Locator;
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
    this.uploadScanButton = page.locator(patientDetailPageLocators.uploadScanButton);
  }

  async addClinicalNote(note: string) {
    await this.clinicalNoteInput.fill(note);
    await this.addNoteButton.click();
  }

  async uploadScan(filePath: string) {
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async addScanComment(comment: string) {
    const addCommentInput = this.page.locator(patientDetailPageLocators.addCommentInput).first();
    await addCommentInput.fill(comment);
  }
}