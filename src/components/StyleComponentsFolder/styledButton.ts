import styled from "styled-components";

const Button = styled.button<{ bgColor?: string; textColor?: string }>`
  background-color: ${(props) => props.bgColor || "black"};
  color: ${(props) => props.textColor || "white"};
  padding: 2px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: ${(props) => props.bgColor ? "#666" : "#333"};
    transform: scale(1.05);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export default Button;
