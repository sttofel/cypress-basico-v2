Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').should('be.visible').type('Filipe')
  cy.get('#lastName').should('be.visible').type('Sttofel')
  cy.get('#email').should('be.visible').type('filipestt@gmail.com')
  cy.get('#open-text-area').should('be.visible').type('Teste')
  //cy.get('button[type="submit"]').click()
  cy.contains('button', 'Enviar').should('be.visible').click()
})