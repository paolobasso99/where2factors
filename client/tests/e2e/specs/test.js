import axios from 'axios';

describe('Test Home', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains(
      'h2',
      'where2factors helps you to find which websites that you use have two factor authentication (TFA)',
    );

    // Write websites
    cy.get('.websites__input__textarea').type(
      'amazon.com\nfilethis.com\ndropbox.com\ndegoo.com\nexample1.com\nexample2.com',
    );

    // Hit API
    cy.server();
    cy.route('POST', '/api/websites', 'fixture:websites.json');
    cy.get('.websites__input__submit').click();

    // Check results
    cy.get('.websites__result .websites__result__list__item').should('have.length',6)
  });
});
