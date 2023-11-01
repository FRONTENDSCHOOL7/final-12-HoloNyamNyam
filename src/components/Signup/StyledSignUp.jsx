import styled from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';

const StyledSignUpWrap = styled.div`
  padding-top: 252px;
  margin: auto;
  text-align: center;
  background: #fff;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  color: black;
  padding-bottom: 58px;
  font-weight: 500;
`;

const StyledInputWrap = styled.div`
  position: relative;
`;

const StyledButton = styled(ButtonStyle)`
  margin: 30px auto 23px auto;
  font-weight: 500;
`;

export { StyledSignUpWrap, StyledInputWrap, StyledTitle, StyledButton };
