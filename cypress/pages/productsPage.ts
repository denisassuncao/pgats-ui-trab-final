// Page Object para a página de produtos (TC08, TC09)
export class ProductsPage {
  visit() {
    cy.visit('/products')
  }

  // verifica se a lista de produtos está visível
  assertProductListVisible() {
    cy.get('.features_items').should('be.visible')
  }

  // abre a página de detalhes do primeiro produto
  openFirstProductDetails() {
    // clicar em 'View Product' do primeiro produto
    cy.get('.product-overlay .overlay-content').first().invoke('show')
    cy.get('.choose').first().click({ force: true })
  }

  // pesquisa por um termo na caixa de busca
  search(term: string) {
    cy.get('#search_product').clear().type(term)
    cy.get('#submit_search').click()
  }
}
