import styled from 'styled-components';

const PlaceDim = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 900;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 390px;
`;

const PlaceCardArticle = styled.article`
  padding: 10px;
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
  height: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const PlaceTextSection = styled.section`
  padding: 15px 5px 10px;
  position: relative;
`;

const PlaceName = styled.h4`
  max-width: 202px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  display: inline-block;
  margin-right: 3px;
`;

const PlaceScoreSpan = styled.span`
  display: inline-block;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  line-height: 14px;
  margin-left: 2px;
`;

const PlaceLocationP = styled.p`
  margin-top: 13px;
  font-size: 14px;
  line-height: 17px;
`;

const PlaceMoreBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 0px;
`;

const PlaceCloseBtn = styled.button`
  position: absolute;
  right: -20px;
  top: -323px;
  width: 30px
  height: 30px;
`;

const TitleWrapper = styled.article`
  display: flex;
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
