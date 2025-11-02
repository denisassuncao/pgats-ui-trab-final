import { ContactPage } from '../pages/contactPage'
import { faker } from '@faker-js/faker'

// TC06: Formulário de contato
describe('TC06 - Formulário de contato', () => {
  it('deve enviar o formulário de contato com sucesso', () => {
    const contact = new ContactPage()
    const email = faker.internet.email()
    contact.visit()

    // Preencher e submeter
    contact.submitContact('Contato Teste', email, 'Assunto teste', 'Mensagem de teste via Cypress')

    // Verificar mensagem de sucesso
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
    // Voltar à home — usar link para a raiz do site
    cy.get('a[href="/"]').first().click({ force: true })
  })
})
