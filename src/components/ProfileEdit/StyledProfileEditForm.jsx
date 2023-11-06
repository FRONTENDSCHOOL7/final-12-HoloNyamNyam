import { styled } from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';
import UploadButton from '../../images/upload-file.svg';

const StyledSignUpWrap = styled.div`
  padding-top: 100px;
  margin: auto;
  background: #fff;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  color: black;
  padding-bottom: 25px;
  font-weight: 500;
`;

const StyledSubTitle = styled.div`
  padding-bottom: 25px;
  color: #767676;
  font-size: 14px;
  font-weight: 400;
`;

const StyledInputWrap = styled.div`
  position: relative;
`;

const StyledButton = styled(ButtonStyle)`
  margin: 30px auto 23px auto;
  font-weight: 500;
`;

const StyledProfileImg = styled.img`
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

const ImageFormContainer = styled.div`
  margin: 0px auto;
  text-align: center;
  padding-bottom: 20px;
`;

const InputImage = styled.input`
  display: none;
`;

export {
  StyledSignUpWrap,
  StyledInputWrap,
  StyledTitle,
  StyledButton,
  StyledSubTitle,
  ImageFormContainer,
  InputImage,
  StyledProfileImg,
  ProfileInputImgButton,
};
