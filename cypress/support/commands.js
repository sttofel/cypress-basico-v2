Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Filipe')
  cy.get('#lastName').type('Sttofel')
  cy.get('#email').type('filipestt@gmail.com')
  cy.get('#open-text-area').type('Teste')
  //cy.get('button[type="submit"]').click()
  cy.contains('button', 'Enviar').click()
})