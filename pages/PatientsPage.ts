import { Page, Locator } from '@playwright/test';
import { patientPageLocators } from '../locators/patientPageLocators';

export class PatientsPage {
  readonly page: Page;
  readonly patientRows: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly openButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.patientRows = page.locator(patientPageLocators.patientRows);
    this.searchInput = page.locator(patientPageLocators.searchInput);
    this.searchButton = page.locator(patientPageLocators.searchButton);
    this.openButton = page.locator(patientPageLocators.openButton);
  }

  async goto() {
    await this.page.goto('/patients');
  }

  async searchPatient(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }


  async openSearchedPatient() {
    await this.openButton.click();
  }

  async openPatientByMRN(mrn: string) {
    const row = this.page.locator(patientPageLocators.patientRows, {
      has: this.page.locator(patientPageLocators.mrnCell, { hasText: mrn })
    });



    await row.locator(patientPageLocators.openButton).click();


  }
}


