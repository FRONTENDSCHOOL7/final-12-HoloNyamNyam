import styled from 'styled-components';

const PlaceImg = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;

const PlaceName = styled.p`
  font-size: 14px;
  margin: 6px 0 2px;
  display: block;
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PlaceScore = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #ffc700;
  margin-left: 2px;
  line-height: 17px;
`;

const ScoreWrap = styled.div`
  display: flex;
`;

export { PlaceImg, PlaceName, PlaceScore, ScoreWrap };
