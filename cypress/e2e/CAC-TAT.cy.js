/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000

  beforeEach(() => { 
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = "Lorem Ipsum is simply dummy text of the printing and. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    cy.clock()
    
    cy.get('#firstName').type('Filipe')
    cy.get('#lastName').type('Sttofel')
    cy.get('#email').type('filipestt@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    
    cy.tick(THREE_SECONDS_IN_MS)
    
    cy.get('.success').should('not.be.visible')  
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').should('be.visible').type('Filipe')
    cy.get('#lastName').should('be.visible').type('Sttofel')
    cy.get('#email').should('be.visible').type('filipestt@gmail,com')
    cy.get('#open-text-area').should('be.visible').type('teste')
    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible') 

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible') 
  })

  Cypress._.times(5, () => {
    it('campo telefone continua vazio quando preenchido com valor nao-numerico', () => {
      cy.get('#phone')
        .should('be.visible')
        .type('abcdefghij')
        .should('have.value', '')
    })
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Filipe')
    cy.get('#lastName').type('Sttofel')
    cy.get('#email').type('filipestt@gmail.com')
    //cy.get('#phone-checkbox').should('be.visible').click()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    //cy.get('button[type="submit"]').click() // revisao desse comando
    cy.contains('button', 'Enviar').click() // para esse por questoes de semantica

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
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
    cy.clock()
    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulario com sucesso usando um comando customizado', () => {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    
    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
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

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('0123456789', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        const { status, statusText, body } = response // desestruturacao javascript
        expect(status).to.eq(200)
        expect(statusText).to.eq('OK')
        expect(body).to.include('CAC TAT')
      })
  })

  it('encontra o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu 💚 gatos!')
  })
  
})
