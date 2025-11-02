// Page Object para cadastro de usuário (TC01, TC05, usado também por outros testes)
export class SignupPage {
  visit() {
    cy.visit('/login')
  }

  // Preenche o formulário inicial de Signup (nome e email) e submit
  startSignup(name: string, email: string) {
    cy.contains('New User Signup!').should('be.visible')
    cy.get('input[data-qa="signup-name"]').clear().type(name)
    cy.get('input[data-qa="signup-email"]').clear().type(email)
    cy.get('button[data-qa="signup-button"]').click()
  }

  // Preenche a segunda etapa do cadastro (Account Information)
  fillAccountInformation(password: string) {
  // espere pelo input de senha ou pela seção; usar timeout maior porque a transição pode demorar
  cy.get('#id_password, input[type="password"], input[name="password"]', { timeout: 10000 }).first().should('exist')
  // senha: usar seletores flexíveis para evitar quebras por IDs diferentes
  cy.get('#id_password, input[type="password"], input[name="password"]').first().clear().type(password)

    // marcar newsletter/optin se existirem (opcional)
    cy.get('body').then($body => {
      if ($body.find('#newsletter, input[name="newsletter"]').length) {
        cy.get('#newsletter, input[name="newsletter"]').check({ force: true })
      }
      if ($body.find('#optin, input[name="optin"]').length) {
        cy.get('#optin, input[name="optin"]').check({ force: true })
      }
    })

    // preencher nome e sobrenome e endereço mínimo usando seletores robustos
    cy.get('input[name="first_name"], input#first_name, input[name="firstname"]').first().type('Teste')
    cy.get('input[name="last_name"], input#last_name, input[name="lastname"]').first().type('Automacao')
    cy.get('input[name="address1"], input#address1').first().type('Rua Exemplo, 123')
    // país/estado/cidade/zipcode/mobile podem ter nomes diferentes; usar seletores comuns
    cy.get('select[name="country"], select#country').then($sel => {
      if ($sel.length) cy.get('select[name="country"], select#country').select('United States')
    })
    cy.get('input[name="state"], input#state').first().type('SP')
    cy.get('input[name="city"], input#city').first().type('Sao Paulo')
    cy.get('input[name="zipcode"], input#zipcode').first().type('01001000')
    cy.get('input[name="mobile_number"], input#mobile_number').first().type('11999999999')

    // Criar conta — preferir botão por texto para maior resiliência
    cy.contains('Create Account').click({ force: true })
  }
}
