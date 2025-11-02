// place for custom commands and helpers
// Exemplo de comando simples
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  // placeholder - implementar caso a caso
  cy.log('login', email)
})

export {}
