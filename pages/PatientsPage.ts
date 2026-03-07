import { Page, Locator } from '@playwright/test';
import { patientPageLocators } from '../locators/patientPageLocators';

export class PatientsPage {
  readonly page: Page;
  readonly patientRows: Locator;
 // readonly firstPatientOpenLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patientRows = page.locator(patientPageLocators.patientRows);
   // this.firstPatientOpenLink = page.locator(patientPageLocators.firstPatientOpenLink);
  }

  async goto() {
    await this.page.goto('/patients');
  }

//   async openFirstPatient() {
//     await this.firstPatientOpenLink.click();
//   }

//   async openPatientByName(name: string) {
//     const row = this.page.locator('table tbody tr', {
//       has: this.page.locator(`text=${name}`)
//     });

//     await row.locator(patientPageLocators.openButton).click();
//   }

  async openPatientByMRN(mrn: string) {
    const row = this.page.locator(patientPageLocators.patientRows, {
    has: this.page.locator(patientPageLocators.mrnCell, { hasText: mrn })
  });

  await row.locator(patientPageLocators.openButton).click();
}
}

