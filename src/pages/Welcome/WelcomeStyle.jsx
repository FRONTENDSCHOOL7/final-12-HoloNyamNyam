import styled from 'styled-components';
import { Link } from 'react-router-dom';
import buttonLogo from '../../images/button-logo.svg';
import buttonLogoHover from '../../images/button-logo-white.svg';

const Container = styled.div`
  background: linear-gradient(180deg, #ff3945 0%, #ff9052 75.76%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
const Logo = styled.img`
  display: block;
  margin-bottom: 12px;
`;
const Login = styled(Link)`
  width: 322px;
  height: 44px;
  color: #767676;
  border-radius: 44px;
  border: 1px solid #fff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 22px;
    height: 22px;
    background: no-repeat center / 22px 22px url(${buttonLogo});
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    background-color: #ffba33;
    color: #fff;
    transition: 0.2s;
    &::before {
      background: no-repeat center / 22px 22px url(${buttonLogoHover});
    }
  }
`;
const Join = styled(Link)`
  width: 322px;
  height: 44px;
  color: #fff;
  border-radius: 44px;
  border: 1px solid #fff;
  background: #ff644b;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 80px;

  &:hover {
    background-color: #ffba33;
    transition: 0.2s;
  }
`;

export { Container, Logo, Login, Join };
