// Page Object para Contact Us (TC06)
export class ContactPage {
  visit() {
    cy.visit('/contact_us')
  }

  submitContact(name: string, email: string, subject: string, message: string) {
    cy.get('input[data-qa="name"]').clear().type(name)
    cy.get('input[data-qa="email"]').clear().type(email)
    cy.get('input[data-qa="subject"]').clear().type(subject)
    cy.get('textarea[data-qa="message"]').clear().type(message)
    // enviar
    cy.get('input[data-qa="submit-button"]').click()
  }
}
