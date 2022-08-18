// https://docs.cypress.io/api/table-of-contents

describe('PromotionView.vue e2e test', () => {
  it('Promotions View has h1 title', () => {
    cy.visit('/promotions')
    cy.get('h1').should('include.text', 'Promociones vigentes')
  })
  it('Texts shoulds have Atlas Grotesk font', () => {
    cy.visit('/promotions')
    cy.get("h1[class='title']").should('have.css', 'font-family').and('match', /Atlas Grotesk/)
    cy.get("span[class='multiselect__placeholder']").should('have.css', 'font-family').and('match', /Atlas Grotesk/)
    cy.get('h3').should('have.css', 'font-family').and('match', /Atlas Grotesk/)
    cy.get('a').should('have.css', 'font-family').and('match', /Atlas Grotesk/)
    cy.get("div[class='card-info-description']").should('have.css', 'font-family').and('match', /Atlas Grotesk/)
    cy.get("div[class='card-info-vigencia']").should('have.css', 'font-family').and('match', /Atlas Grotesk/)
  })
  it('Cards container should be flex', () => {
    cy.visit('/promotions')
    cy.get("div[class='cards-container']").should('have.css', 'display').and('match', /flex/)
  })
  it('Promotion cards should be rendered', () => {
    cy.visit('/promotions')
    cy.get("div[class='card']").should('be.visible')
  })
})
