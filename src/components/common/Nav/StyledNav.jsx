import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavWrapper = styled.nav`
  position: fixed;
  max-width: 390px;
  z-index: 100;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  border-top: 1px solid #dbdbdb;
`;

const NavList = styled.ul`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #767676;

  &.active {
    color: #ff644b;
  }
`;

const StyledNavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
`;
const ScrollButton = styled.button`
  position: sticky;
  padding: 10px 10px 0 10px;
  opacity: 0.5;
  transition: opacity 0.3s;
  cursor: pointer;
  z-index: 999;
  margin: auto;
  &:hover {
    opacity: 1;
  }
`;

const TopIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SvgDiv = styled.div`
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease;
  transform: scale(${(props) => props.scale});
  &:hover {
    transform: scale(1.2);
  }
`;

export {
  NavWrapper,
  NavList,
  NavLink,
  StyledNavText,
  ScrollButton,
  TopIcon,
  ButtonContainer,
  SvgDiv,
};
