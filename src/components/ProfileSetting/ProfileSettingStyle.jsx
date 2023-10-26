import { styled } from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';
import UploadButton from '../../images/upload-file.svg';

const ProfileContainerStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelStyle = styled.label`
  color: var(--767676, #767676);
  font-family: Spoqa Han Sans Neo;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InputStyle = styled.input`
  width: 322px;
  height: 30px;
  border-bottom: 1px solid #dbdbdb;

  &::placeholder {
    color: var(--DBDBDB, #dbdbdb);
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #ff644b;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInputImgButton = styled.button`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 36px;
    height: 36px;
    bottom: 0;
    right: 0;
    background: url(${UploadButton}) no-repeat center / contain;
  }
`;

const FormTitleStyle = styled.h1`
  color: #000;

  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SubTitleStyle = styled.p`
  margin-top: 12px;
  color: var(--767676, #767676);
  text-align: center;
  font-family: Spoqa Han Sans Neo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
`;

const ImageFormContainer = styled.div`
  margin: 0 auto;
`;

const ProfileFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 10px;
`;

const InputImage = styled.input`
  display: none;
`;

const StyledButton = styled(ButtonStyle)`
  margin-top: 10px;
`;

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
  ErrorStyle,
  LabelStyle,
  InputStyle,
  ProfileImg,
  ProfileInputImgButton,
};
