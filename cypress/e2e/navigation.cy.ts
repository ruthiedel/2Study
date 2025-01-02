
describe('Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/home');
    });

    it('should navigate to book catalog when clicking the catalog button', () => {
        cy.contains('button', 'קטלוג ספרים').click();
        cy.wait(5000);
        cy.url().should('include', '/bookCatalog');
        cy.contains('label', 'מיין לפי:').should('be.visible');
        cy.contains('label', 'שם ספר:').should('be.visible');
        cy.contains('label', 'שם מחבר:').should('be.visible');
        cy.contains('label', 'קטגוריה:').should('be.visible');

        cy.get('input[placeholder=" מצא לפי שם ספר"]').should('be.visible');
        cy.get('input[placeholder="מצא לפי שם מחבר"]').should('be.visible');
        cy.get('select').should('be.visible');
    });
    
});
