import { SignupPage } from '../pages/signupPage'
import { LoginPage } from '../pages/loginPage'
import { faker } from '@faker-js/faker'

// TC02: Login do usuário com e-mail e senha corretos
describe('TC02 - Login com credenciais corretas', () => {
  it('deve permitir login com email e senha válidos', () => {
    const signup = new SignupPage()
    const login = new LoginPage()
    const email = faker.internet.email()
    const password = 'Senha123!'

    // Registrar o usuário (garante que exista)
    signup.visit()
    signup.startSignup('Usuario Login', email)
    signup.fillAccountInformation(password)
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains('Logged in as').should('be.visible')

    // Fazer logout para testar login
    cy.contains('Logout').click()

    // Testar login
    login.visit()
    login.login(email, password)

    // Verificar que login foi bem-sucedido
    cy.contains('Logged in as').should('be.visible')
  })
})
