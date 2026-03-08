export const patientDetailPageLocators = {

    "patientRowByName": "h2:has-text(\"Bella Powell\")",
    "dob": "text=DOB",
    "mrn": "text=MRN",

    "medicalHistory": "text=Medical History",
    "labResultsTable": "h3:has-text(\"Lab Results\")",
    "referralsSection": "text=Referrals",

    "clinicalNotesSection": "text=Clinical Notes",
    "clinicalNoteInput": "[data-testid='add-note-input']",
    "addNoteButton": "[data-testid='add-note-submit']",

    "patientNote": "p:has-text(\"Patient responding well to immunotherapy\")",
    "noteTimestamp": "span.text-gray-500",

    "orderInput": "[data-testid='order-type-select']",
    "createOrderButton": "[data-testid='order-submit']",
  labTestRow: "div:has(span.font-medium:has-text('CT'))",
  labTestName: "span.font-medium.text-gray-900",

  //  "patientOrderMRI": "span:has-text(\"MRI\")",
    "orderTimestamp": "span.text-gray-500"


}