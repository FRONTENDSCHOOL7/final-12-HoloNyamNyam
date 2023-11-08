import { ButtonStyle } from '../common/Button/Button';
import styled from 'styled-components';

const StyledInputWrap = styled.div`
  position: relative;
`;

const StyledButton = styled(ButtonStyle)`
  margin: 30px auto 23px auto;
  font-weight: 500;
`;

const StyledCheckbox = styled.input`
  vertical-align: middle;
  margin-right: 10px;
`;

const CheckboxDiv = styled.div`
  display: inline-block;
  margin-right: 10px;
  .taste {
    appearance: none;
    background-color: #dfe1e4;
    border-radius: 72px;
    border-style: none;
    flex-shrink: 0;
    height: 20px;
    margin: 0;
    position: relative;
    width: 30px;

    &::before {
      bottom: -6px;
      content: '';
      left: -6px;
      position: absolute;
      right: -6px;
      top: -6px;
    }

    &,
    &::after {
      transition: all 100ms ease-out;
    }

    &::after {
      background-color: #fff;
      border-radius: 50%;
      content: '';
      height: 14px;
      left: 3px;
      position: absolute;
      top: 3px;
      width: 14px;
    }

    &:hover {
      background-color: #c9cbcd;
      transition-duration: 0s;
    }

    &:checked {
      background-color: #ff644b;

      &::after {
        background-color: #fff;
        left: 13px;
      }
    }

    &:focus:not(.focus-visible) {
      outline: 0;
    }

    &:checked:hover {
      background-color: #ff644b;
    }
  }
`;
const StyledCheckboxLable = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: black;
  cursor: pointer;
`;

export {
  StyledButton,
  StyledInputWrap,
  StyledCheckbox,
  StyledCheckboxLable,
  CheckboxDiv,
};
