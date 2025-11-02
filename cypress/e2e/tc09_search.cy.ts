import { ProductsPage } from '../pages/productsPage'

// TC09: Pesquisar produto
describe('TC09 - Pesquisa de produto', () => {
  it('deve retornar resultados ao pesquisar um termo existente', () => {
    const products = new ProductsPage()
    products.visit()

    // Termo genérico que deve retornar itens
    products.search('dress')

    // Verifica que resultados aparecem
    cy.get('.features_items').should('contain.text', 'Dress')
  })
})
