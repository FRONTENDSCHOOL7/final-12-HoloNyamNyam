import { ButtonStyle } from '../common/Button/Button';
import styled, { keyframes } from 'styled-components';

const StyledInputWrap = styled.div`
  position: relative;
`;

const StyledLabel = styled.label`
  display: block;
  text-align: left;
  padding: 0 34px;
  font-size: 12px;
  color: #767676;
  pointer-events: none;
  font-weight: 500;
`;

const StyledInput = styled.input`
  display: block;
  width: 322px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  border-radius: 4px 4px 0 0;
  height: 48px;
  font-size: 14px;
  margin: 0 auto 34px auto;
  outline: none;
  background: transparent;
  animation: ${(props) => (props.$haserror ? shake : 'none')} 0.4s linear;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    /* outline: none; */
    border-bottom: 1px solid #ff644b;
  }
`;

const StyledButton = styled(ButtonStyle)`
  margin: 30px auto 23px auto;
  font-weight: 500;
`;

const StyledError = styled.p`
  font-size: 12px;
  color: red;
  position: absolute;
  bottom: -18px;
  left: 35px;
`;

const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`;

export {
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledError,
  StyledInputWrap,
  shake,
};
