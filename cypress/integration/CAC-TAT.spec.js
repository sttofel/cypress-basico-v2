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
    cy.get('#firstName').should('be.visible').type('Filipe')
    cy.get('#lastName').should('be.visible').type('Sttofel')
    cy.get('#email').should('be.visible').type('filipestt@gmail,com')
    cy.get('#open-text-area').should('be.visible').type('teste')
    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible') 
  })

  it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
    cy.get('#phone')
      .should('be.visible')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Filipe')
    cy.get('#lastName').type('Sttofel')
    cy.get('#email').type('filipestt@gmail.com')
    //cy.get('#phone-checkbox').should('be.visible').click()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    //cy.get('button[type="submit"]').click() // revisao desse comando
    cy.contains('button', 'Enviar').click() // para esse por questoes de semantica

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Filipe')
      .should('have.value', 'Filipe')
      .clear()
      .should('have.value', '')
    
      cy.get('#lastName')
        .should('be.visible')
        .type('Sttofel')
        .should('have.value', 'Sttofel')
        .clear()
        .should('have.value', '')
    
    cy.get('#email')
      .should('be.visible')
      .type('filipestt@gmail.com')
      .should('have.value', 'filipestt@gmail.com')
      .clear()
      .should('have.value', '')
    
    cy.get('#phone')
      .should('be.visible')
      .type('123456')
      .should('have.value', '123456')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () => {
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible') 
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    //cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($radio) => { // iteracao
      cy.wrap($radio).check() // empacotamento
      cy.wrap($radio).should('be.checked')
    })
  })
  
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  
})
