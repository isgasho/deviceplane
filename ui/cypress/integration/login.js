describe('Login', function() {
  it('should render', () => {
    cy.visit('/login');

    cy.matchImageSnapshot('login');
  });
});
