import styled from 'styled-components';

const PlaceDim = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 390px;
`;

const PlaceCardArticle = styled.article`
  width: 304px;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const PlaceListImg = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const PlaceTextSection = styled.section`
  padding: 18px 16px 23px;
  position: relative;
`;

const PlaceName = styled.h4`
  font-size: 20px;
  line-height: 20px;
  font-weight: 400;
  display: inline-block;
`;

const PlaceScoreSpan = styled.span`
  display: inline-block;
  color: #000;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;

const PlaceLocationP = styled.p`
  margin-top: 13px;
  font-size: 14px;
  line-height: 17px;
`;

const PlaceMoreBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 5px;
`;

const PlaceCloseBtn = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 0;
  top: -200px;
`;

const TitleWrapper = styled.article`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export {
  PlaceDim,
  PlaceCardArticle,
  PlaceListImg,
  PlaceTextSection,
  PlaceName,
  PlaceScoreSpan,
  PlaceLocationP,
  PlaceMoreBtn,
  PlaceCloseBtn,
  TitleWrapper,
};
