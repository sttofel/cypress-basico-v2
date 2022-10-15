/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => { 
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    cy.get('#firstName').type('Filipe')
    cy.get('#lastName').type('Sttofel')
    cy.get('#email').type('filipestt@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')  
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Filipe')
    cy.get('#lastName').type('Sttofel')
    cy.get('#email').type('filipestt@gmail,com')
    cy.get('#open-text-area').type('teste')
    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible') 
  })

  it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Filipe')
    cy.get('#lastName').type('Sttofel')
    cy.get('#email').type('filipestt@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Filipe')
      .should('have.value', 'Filipe')
      .clear()
      .should('have.value', '')
    
      cy.get('#lastName')
      .type('Sttofel')
      .should('have.value', 'Sttofel')
      .clear()
      .should('have.value', '')
    
    cy.get('#email').type('filipestt@gmail.com')
      .should('have.value', 'filipestt@gmail.com')
      .clear()
      .should('have.value', '')
    
    cy.get('#phone')
      .type('123456')
      .should('have.value', '123456')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () => {
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible') 
  })
  
})
