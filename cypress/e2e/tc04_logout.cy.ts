import { faker } from '@faker-js/faker'
import { SignupPage } from '../pages/signupPage'

// TC04: Fazer logout do usuário
describe('TC04 - Logout', () => {
  it('deve logout corretamente após login', () => {
    // Reaproveitamos o Page Object para registro + logout
    const signup = new SignupPage()
    const email = faker.internet.email()
    const password = 'Senha123!'

    // Registrar usuário via Page Object
    signup.visit()
    signup.startSignup('UsuarioLogout', email)
    signup.fillAccountInformation(password)
    // clicar em continuar se existir
    cy.get('body').then($b => {
      if ($b.find('a[data-qa="continue-button"]').length) cy.get('a[data-qa="continue-button"]').click()
    })

    // Fazer logout
    cy.contains(/logout/i, { timeout: 10000 }).should('be.visible').click()

    // Verificar retorno à página de login/signup
    cy.contains(/signup \/? login/i, { timeout: 10000 }).should('be.visible')
  })
})
