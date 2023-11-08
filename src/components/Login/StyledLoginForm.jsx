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

const StyledCheckboxLable = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: black;
  cursor: pointer;
`;

export { StyledButton, StyledInputWrap, StyledCheckbox, StyledCheckboxLable };
