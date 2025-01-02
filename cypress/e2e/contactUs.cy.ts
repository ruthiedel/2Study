
describe('Footer Contact Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/home'); 
    });
  
    it('should submit the contact form successfully', () => {
      const nameInput = cy.get(`[name="name"]`);
      const emailInput = cy.get(`[name="email"]`);
      const messageInput = cy.get(`[name="message"]`);
      const submitButton = cy.get(`button[type="submit"]`);
  
      nameInput.type('Test User');
      emailInput.type('test@example.com');
      messageInput.type('This is a test message.');
      submitButton.click();
        
      //check reset
      cy.get('[name="name"]').should('have.value', '');
      cy.get('[name="email"]').should('have.value', '');
      cy.get('[name="message"]').should('have.value', '');
      });
  
    it('empty fields', () => {
      cy.get(`button[type="submit"]`).click(); 
      cy.wait(5000);
      cy.get('[data-testid="name-error"]').contains('*');
      cy.get('[data-testid="email-error"]').contains('*');
      cy.get('[data-testid="message-error"]').contains('*');
    });
  
    it('invalid email format', () => {
      cy.get(`[name="email"]`).type('invalid_email');  
      cy.get(`button[type="submit"]`).click();

      cy.get('[data-testid="email-error"]').contains('*כתובת מייל לא תקינה').should('be.visible');
    });
  });

 