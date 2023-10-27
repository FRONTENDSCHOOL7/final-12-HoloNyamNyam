import React from 'react';
import { PlaceImg, PlaceName, PlaceScore, ScoreWrap } from './StyledPlace';
import sprite from '../../images/SpriteIcon.svg';

export default function Place() {
  const StarSVG = ({ id, size = 17 }) => (
    <svg width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  return (
    <>
      <PlaceImg
        src='https://api.mandarin.weniv.co.kr/1697095241244.jpg'
        alt='식당 또는 음식 사진'
      />
      <PlaceName>식당명</PlaceName>
      <ScoreWrap>
        <StarSVG id='star' />
        <PlaceScore>5.0</PlaceScore>
      </ScoreWrap>
    </>
  );
}
