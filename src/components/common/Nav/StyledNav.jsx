import styled from 'styled-components';

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

const StyledNavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: -58px;
  right: 0;
`;
const ScrollButton = styled.button`
  position: sticky;
  top: 88%;
  left: 85%;
  background-color: #629678;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 999;
  margin-right: 12px;
`;

const TopIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export {
  NavWrapper,
  NavList,
  ButtonContainer,
  ScrollButton,
  StyledNavText,
  TopIcon,
};
// // NavLink,
