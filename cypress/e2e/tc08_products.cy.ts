import { ProductsPage } from '../pages/productsPage'

// TC08: Verificar todos os produtos e a página de detalhes do produto
describe('TC08 - Lista de produtos e detalhes', () => {
  it('deve listar produtos e abrir detalhe do primeiro', () => {
    const products = new ProductsPage()
    products.visit()
    products.assertProductListVisible()

    // Abrir detalhes do primeiro produto
    // Observação: dependendo do overlay do site, o clique força interação
    cy.get('.product-image-wrapper').first().within(() => {
      cy.contains('View Product').click({ force: true })
    })

    // Verificar que a página de detalhes mostra informações do produto
    cy.get('.product-information').should('be.visible')
  })
})
