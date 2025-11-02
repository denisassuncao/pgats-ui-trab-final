import { LoginPage } from '../pages/loginPage'
import { faker } from '@faker-js/faker'

// TC03: Login do usuário com e-mail e senha incorretos
describe('TC03 - Login com credenciais incorretas', () => {
  it('não deve permitir login com senha incorreta', () => {
    const login = new LoginPage()
    const fakeEmail = faker.internet.email()

    login.visit()
    login.login(fakeEmail, 'senhaErrada')

    // Verifica mensagem de erro apropriada
    cy.contains('Your email or password is incorrect!').should('exist')
  })
})
