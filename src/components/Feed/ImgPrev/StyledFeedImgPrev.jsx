import styled from 'styled-components';
import closeBtn from '../../../images/close-btn.svg';

const UploadContainer = styled.form`
  width: 100%;
  padding: 15px 15px;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  display: flex;
`;

const UploadImgWrapper = styled.label`
  display: inline-block;
  width: 90px;
  height: 80px;
  flex-shrink: 0;
  cursor: pointer;
`;

const UploadImgInput = styled.input`
  display: none;
`;

const UploadImgDiv = styled.div`
  position: relative;
  margin-right: 10px;
`;
const UploadImg = styled.img`
  max-width: 80px;
  max-height: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #eee;
  box-sizing: border-box;
`;
const CloseImgBtn = styled.button`
  background: url(${closeBtn}) center center / 18px 18px no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 4px;
  right: 4px;
`;

export {
  UploadContainer,
  UploadImg,
  UploadImgDiv,
  UploadImgInput,
  UploadImgWrapper,
  CloseImgBtn,
};
