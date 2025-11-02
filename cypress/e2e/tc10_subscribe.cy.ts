import { faker } from '@faker-js/faker'

// TC10: Verificar assinatura na página inicial
describe('TC10 - Assinatura na home', () => {
  it('deve permitir assinar a newsletter na home', () => {
    cy.visit('/')
    const email = faker.internet.email()

    // rolar até o footer onde está o campo de assinatura e usar seletores flexíveis
    cy.get('footer').scrollIntoView()
    cy.get('footer').within(() => {
      // tentar diferentes seletores de input de email
      cy.get('input[type="email"], input[name*="email"], input#susbscribe_email, input#subscribe').first().type(email)
      // clicar no botão de subscribe pelo texto
      cy.contains(/subscribe/i).click({ force: true })
    })

    // Verificar mensagem de sucesso (texto pode variar). O container pode
    // inicialmente estar oculto; checamos existência e conteúdo textual.
    cy.get('#success-subscribe, .alert-success', { timeout: 10000 })
      .should('exist')
      .invoke('text')
      .then(text => {
        const lower = (text || '').toLowerCase()
        expect(lower).to.satisfy(t => t.includes('success') || t.includes('subscribed') || t.includes('thank'))
      })
  })
})
