/// <reference types="Cypress" />

describe('Auth', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should signup', () => {
    cy.visit('signup');
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('test3@gmail.com');
    cy.get('[data-cy="auth-password"]').type('qwerty');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('eq', '/takeaways');
    cy.getCookie('__session').its('value').should('not.be.empty');
  });
});
