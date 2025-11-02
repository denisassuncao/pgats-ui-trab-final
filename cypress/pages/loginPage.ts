// Page Object para login
export class LoginPage {
  visit() {
    cy.visit('/login')
  }

  // Faz login com email e password
  login(email: string, password: string) {
    cy.contains('Login to your account').should('be.visible')
    cy.get('input[data-qa="login-email"]').clear().type(email)
    cy.get('input[data-qa="login-password"]').clear().type(password)
    cy.get('button[data-qa="login-button"]').click()
  }
}
