import './commands'

// evitar falhas por exceções não tratadas da página
Cypress.on('uncaught:exception', (err, runnable) => {
  // retornar false evita que o teste falhe por exceções não capturadas
  return false
})
