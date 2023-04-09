/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });

  it('should add new takeaway', () => {
    cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway');
    cy.login();
    cy.contains('Add a new takeaway').click();
    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('NewTitle1');
    cy.get('[data-cy="body"]').type('NewBody1');
    cy.get('[data-cy="create-takeaway"]').click();
    cy.wait('@createTakeaway')
      .its('request.body')
      .should('match', /NewTitle1.*NewBody1.*/);
    // cy.contains('New Title');
    // cy.contains('New Body');
    // cy.get('[data-cy="takeaway-item"]').should('have.length', 3);
  });
});
