import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
`;

const Heading = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 24px;
  color: #666;
  text-align: center;
`;

export { Message, Heading, Container };
