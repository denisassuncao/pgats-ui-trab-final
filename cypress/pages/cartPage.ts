// Page Object para carrinho e checkout (uso no TC15)
export class CartPage {
  visit() {
    cy.visit('/view_cart')
  }

  proceedToCheckout() {
    cy.contains('Proceed To Checkout').should('be.visible').first().click({ force: true })
  }
}
