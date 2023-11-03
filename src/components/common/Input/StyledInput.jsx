import styled, { keyframes } from 'styled-components';

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
  padding: 0;
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
  animation: ${({ $hasError }) => ($hasError ? shake : 'none')} 0.4s linear;
  &::placeholder {
    color: #dbdbdb;
  }
  &:focus {
    border-bottom: 1px solid #ff644b;
  }
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

const StyledError = styled.p`
  font-size: 12px;
  color: red;
  position: absolute;
  left: 35px;
  bottom: -18px;
`;

export { StyledLabel, StyledInput, shake, StyledError };
