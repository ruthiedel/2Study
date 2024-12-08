import styled from 'styled-components';

export const StyledLink = styled.a`
  position: relative;
  display: flex;
  text-decoration: none; 
  justify-content: space-between;
  color: inherit; 
  font-size: 8px
  border: none; 
  padding: 10px 15px; 
  margin: 15px 0;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1); 
  cursor: pointer; 
  transition: transform 0.2s, box-shadow 0.2s; 
  
  &:hover {
    transform: scale(1.05); 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
  }

  &:active {
    transform: scale(0.98); 
  }
`;
