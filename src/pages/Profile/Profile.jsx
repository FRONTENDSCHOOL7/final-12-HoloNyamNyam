import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import InfoProfile from '../../components/Profile/InfoProfile';
import FeedList from '../../components/Feed/FeedList/FeedList';
import RatePlace from '../../components/Profile/RatePlace';
import PlaceCard from '../../components/Modal/PlaceCard/PlaceCard';
import { useRecoilState } from 'recoil';
import { cardShowState } from '../../recoil/cardShowAtom';

export default function Profile({ type }) {
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);

  const [cardShow, setCardShow] = useRecoilState(cardShowState);
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
      <Header type='profile' />
      <InfoProfile type={type} />
      <RatePlace cardOpen={cardOpen} cardClosed={cardClosed} />
      <FeedList />
      {cardShow && selectedId && (
        <PlaceCard cardClose={cardClose} id={selectedId} />
      )}
      <Nav />
    </>
  );
}
