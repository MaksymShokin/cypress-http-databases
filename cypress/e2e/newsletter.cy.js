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

  it('should show error message when user already subscribed', () => {
    cy.intercept('POST', '/newsletter*', { message: 'Email already exists' });
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains('Email already exists');
  });

  it('should successfully create new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'test@example.com' },
      form: true
    }).then(res => {
      expect(res.status).to.eq(201);
    });
  });
});
