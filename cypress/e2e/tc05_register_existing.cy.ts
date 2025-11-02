import { SignupPage } from '../pages/signupPage'
import { faker } from '@faker-js/faker'

// TC05: Cadastrar usuário com e-mail existente
describe('TC05 - Registrar com e-mail existente', () => {
  it('deve recusar cadastro quando email já existe', () => {
    const signup = new SignupPage()
    const email = faker.internet.email()

    // Primeiro registro (sucesso)
    signup.visit()
    signup.startSignup('Usuario Existente', email)
    signup.fillAccountInformation('Senha123!')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains('Logged in as').should('be.visible')

    // Logout
    cy.contains('Logout').click()

    // Tentar registrar novamente com o mesmo email
    signup.visit()
    signup.startSignup('Usuario Existente2', email)

    // Verificar que mensagem de erro sobre email existente aparece
    cy.contains('Email Address already exist!').should('be.visible')
  })
})
