import styled from 'styled-components';

const ChatNavBar = styled.nav`
  position: fixed;
  max-width: 390px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  background-color: white;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
`;

const ImageIcon = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const Input = styled.input`
  margin: 0 18px;
  width: 100%;
  font-size: 14px;
  &::placeholder {
    color: #c4c4c4;
  }
  &:focus {
    outline: none;
  }
`;

const SendBtn = styled.button`
  width: 70px;
  color: ${({ $hastext }) => ($hastext ? '#FF644B' : '#C4C4C4')};
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease 0s;
  transform: scale(1);
  &:hover {
    transform: ${({ $hastext }) =>
      $hastext ? 'scale(1.2) translateX(0)' : ''};
  }
`;

export { ChatNavBar, Input, ImageIcon, SendBtn };
