import { Filter } from '../../src/components'

describe('Filter Component', () => {
    const mockCategories = ['חסידות', 'מוסר', 'שמירת הלשון', 'תיקון המידות'];
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/bookCatalog');
      });
  
    it('should render all filter inputs correctly', () => {
      cy.contains('label', 'מיין לפי:').should('be.visible');
      cy.contains('label', 'שם ספר:').should('be.visible');
      cy.contains('label', 'שם מחבר:').should('be.visible');
      cy.contains('label', 'קטגוריה:').should('be.visible');
      
      cy.get('input[placeholder=" מצא לפי שם ספר"]').should('be.visible');
      cy.get('input[placeholder="מצא לפי שם מחבר"]').should('be.visible');
      cy.get('select').should('be.visible');
    });
  
    it('should update book name input correctly', () => {
      const testBookName = 'תניא';
      cy.get('input[placeholder=" מצא לפי שם ספר"]')
        .type(testBookName)
        .should('have.value', testBookName);
    });
  
    it('should update author name input correctly', () => {
      const testAuthorName = 'לא ידוע';
      cy.get('input[placeholder="מצא לפי שם מחבר"]')
        .type(testAuthorName)
        .should('have.value', testAuthorName);
    });
  
    it('should handle category selection and removal', () => {
      cy.get('select').select(mockCategories[0]);  
      cy.contains(mockCategories[0]).should('be.visible');
      
      cy.contains('button', '×').click();
      cy.get('select').should('contain', mockCategories[0]);
      cy.contains('קטגוריה:').next('span').should('contain', '0');
    });
  
    it('should display correct category count', () => {
        cy.get('select').select(mockCategories[0]);
        cy.get('select').select(mockCategories[1]);      
        cy.contains('קטגוריה:').next('span').should('contain', '2');
    });
  
    it('should not show selected categories in dropdown', () => {
      const selectedCategory = mockCategories[0];

      cy.get('select option').each(($option) => {
        if ($option.val() !== '') {  
          expect($option.text().trim()).not.to.equal(selectedCategory);
        }
      });
    });
  });