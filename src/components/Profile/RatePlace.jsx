import React, { useState, useEffect } from 'react';
import Place from '../Place/PlaceListItem';
import {
  RateWrap,
  RateTitleWrap,
  RateTitle,
  MoreViewBtn,
  PlaceList,
} from './StyledRatePlace';
import { useNavigate } from 'react-router-dom';
import PlaceCard from '../../components/Modal/PlaceCard/PlaceCard';

export default function RatePlace({ name }) {
  const navigate = useNavigate();
  function movePlaceList() {
    navigate('/placelist');
  }
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);

  const [cardShow, setCardShow] = useState(false);
  function cardClose(e) {
    if (e.target === e.currentTarget) {
      setCardShow(false);
    }
    setCardClosed(true);
  }

  function cardOpen(id) {
    setSelectedId(id);
    setCardShow(true);
  }
  useEffect(() => {
    if (cardClosed) {
      setCardClosed(false);
    }
  }, [cardClosed]);

  return (
    <>
      <RateTitleWrap>
        <RateTitle>{name}님의 냠냠평가</RateTitle>
        <MoreViewBtn
          type='button'
          size='ms'
          $border='active'
          color='active'
          onClick={movePlaceList}
        >
          더보기
        </MoreViewBtn>
      </RateTitleWrap>
      <RateWrap>
        <PlaceList>
          <PlaceListItem cardOpen={cardOpen} cardClosed={cardClosed} />
          {cardShow && <PlaceCard cardClose={cardClose} id={selectedId} />}
        </PlaceList>
      </RateWrap>
    </>
  );
}
