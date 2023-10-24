import {styled} from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';


//GlobalStyle 적용이 왜 안되지..?
const ProfileContainerStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const FormTitleStyle = styled.h1`
  color: #000;

  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
  `
const SubTitleStyle = styled.p`
  margin-top: 12px;
  color: var(--767676, #767676);
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
`

const ImageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileFormContainer =  styled.form`
  display: flex;
  flex-direction:column;
  align-items: flex-start;

  gap: 12px;
`

const InputImage = styled.input`
  width: 36px;
  height: 36px;
  background-image: url("../../images/upload-file.svg") no-repeat;
`

const StyledButton = styled(ButtonStyle)`
    margin-top: 30px;
`

const ErrorStyle = styled.p`
  color: var(--Red, #eb5757);
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 116.667% */
`;

export {
    ProfileContainerStyle,
    TextWrapper,
    FormTitleStyle,
    StyledButton,
    SubTitleStyle,
    ImageFormContainer,
    ProfileFormContainer,
    InputImage,
    ErrorStyle
}