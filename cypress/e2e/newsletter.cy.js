/// <reference types="Cypress" />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should subscribe to newsletter', () => {
    // intercept http request and return dummy data
    cy.intercept('POST', '/newsletter*', { status: 201 });

    // wait for intercepted request
    // cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe');
    // cy.wait('@subscribe')

    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains('Thanks for signing up!');
  });
});
