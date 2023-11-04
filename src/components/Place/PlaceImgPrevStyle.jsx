import styled from 'styled-components';
// import imgbg from '../../../assets/images/img-bg.svg';

const PlaceImgInput = styled.input`
  display: none;
`;
const PlaceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;
const EmptyBox = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 204px;
  border-radius: 10px;
  background: var(--Gray-6, #f2f2f2);
`;
const PlaceImgWrapper = styled.div`
  width: 100%;
  height: 236px;
  margin-bottom: 10px;
  position: relative;
`;
const ImgWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 204px;
`;
const defaultIconPosition = `
  bottom: 44px;
  right: -4px;
`;
const PlaceIconWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 85%;
  /* ${(props) => props.wrapperStyle || defaultIconPosition} */
`;
const defaultIconStyle = `
  width: 75%;
  height: 75%;
`;
const PlaceImgIcon = styled.img`
  object-fit: contain;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  position: absolute;
  bottom: 20px;
  right: 0;
  /* ${(props) => props.iconStyle || defaultIconStyle} */
`;

export {
  PlaceIconWrapper,
  PlaceImg,
  PlaceImgIcon,
  PlaceImgInput,
  PlaceImgWrapper,
  ImgWrapper,
  EmptyBox,
};
