import { ProductsPage } from '../pages/productsPage'
import { SignupPage } from '../pages/signupPage'
import { CartPage } from '../pages/cartPage'
import { faker } from '@faker-js/faker'

// TC15: Fazer pedido — registre-se antes de finalizar a compra
describe('TC15 - Fazer pedido com registro prévio', () => {
  it('deve permitir registrar, adicionar produto e prosseguir para checkout', () => {
    const products = new ProductsPage()
    const signup = new SignupPage()
    const cart = new CartPage()

  const email = faker.internet.email()
    const password = 'Senha123!'

    // Registrar usuário
    signup.visit()
    signup.startSignup('Usuario Pedido', email)
    signup.fillAccountInformation(password)
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains('Logged in as').should('be.visible')

    // Ir para produtos e abrir a página de detalhe do primeiro produto
    products.visit()
    // abrir detalhes do primeiro produto (View Product) para então adicionar ao carrinho de forma unívoca
    cy.get('.product-image-wrapper, .single-products').first().then(($card: any) => {
      const href = $card.find('a[href*="/product_details/"]').attr('href')
      if (href) {
        // navegar diretamente para a página de detalhe do produto
        cy.visit(href)
      } else {
        // fallback: clicar no primeiro link de detalhe disponível
        cy.get('a[href*="/product_details/"]').first().click({ force: true })
      }
    })

    // Na página de detalhe do produto, clicar em Add to cart
    cy.wait(1000) // dar tempo para a página carregar
    cy.contains(/add to cart/i).should('be.visible').first().click({ force: true })
    
    // Aguardar o modal de sucesso e então ir para o carrinho
    cy.contains(/added!/i).should('be.visible')
    cy.wait(500) // aguardar animação

    // Visualizar carrinho e proceder
    cy.contains('View Cart').should('be.visible').first().click({ force: true })
    cart.proceedToCheckout()

    // Verifica que chegou à página de checkout (pode pedir confirmação de endereço)
    cy.contains('Address Details').should('be.visible')
  })
})
