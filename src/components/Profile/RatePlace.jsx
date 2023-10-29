import React from 'react';
import Place from '../Place/PlaceListItem';
import {
  RateWrap,
  RateTitleWrap,
  RateTitle,
  MoreViewBtn,
  PlaceList,
} from './StyledRatePlace';

export default function RatePlace({ name }) {
  return (
    <RateWrap>
      <RateTitleWrap>
        <RateTitle>{name}의 냠냠평가</RateTitle>
        <MoreViewBtn type='button' size='ms' $border='active' color='active'>
          더보기
        </MoreViewBtn>
      </RateTitleWrap>
      <PlaceList>
        <li>
          <Place />
        </li>
        <li>
          <Place />
        </li>
        <li>
          <Place />
        </li>
      </PlaceList>
    </RateWrap>
  );
}
