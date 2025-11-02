import { SignupPage } from '../pages/signupPage'
import { faker } from '@faker-js/faker'

// TC01: Cadastrar usuário
describe('TC01 - Cadastrar usuário', () => {
  it('deve criar um usuário novo com sucesso', () => {
    const signup = new SignupPage()
    const email = faker.internet.email()
    const firstName = faker.person.firstName()

    // Visita a página de signup
    signup.visit()

    // Inicia cadastro com nome e email (usa faker para gerar dados únicos)
    signup.startSignup(firstName + ' Teste', email)

    // Preenche o restante do formulário (senha e dados mínimos)
    signup.fillAccountInformation('Senha123!')

    // Após submeter, o site pode mostrar 'ACCOUNT CREATED!' ou redirecionar
    // Vamos ser resilientes: se existir botão de continue, clicar e validar login;
    // caso contrário, aceitar o texto de confirmação ou verificar que usuário está logado.
    cy.get('body').then($body => {
      if ($body.find('a[data-qa="continue-button"]').length) {
        cy.get('a[data-qa="continue-button"]').click()
        cy.contains(/logged in as/i, { timeout: 10000 }).should('be.visible')
      } else if ($body.text().match(/account created/i)) {
        cy.contains(/account created/i).should('be.visible')
        cy.get('a[data-qa="continue-button"]').click()
        cy.contains(/logged in as/i, { timeout: 10000 }).should('be.visible')
      } else {
        // fallback: aguardar que a área de usuário apareça
        cy.contains(/logged in as/i, { timeout: 10000 }).should('be.visible')
      }
    })
  })
})
