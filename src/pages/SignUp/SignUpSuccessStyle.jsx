import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background: linear-gradient(180deg, #ff3945 0%, #ff9052 75.76%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
`;

const Greeting = styled.p`
  color: #fff;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
`;

const GoFeed = styled(Link)`
  width: 322px;
  height: 44px;
  color: #fff;
  border-radius: 44px;
  border: 1px solid #fff;
  background: #ff644b;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ffba33;
  }
`;

export { Container, Greeting, GoFeed };
