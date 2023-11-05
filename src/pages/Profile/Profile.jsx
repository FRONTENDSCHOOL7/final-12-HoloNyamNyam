import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import InfoProfile from '../../components/Profile/InfoProfile';
import FeedList from '../../components/Feed/FeedList/FeedList';
import RatePlace from '../../components/Profile/RatePlace';
import PlaceCard from '../../components/Modal/PlaceCard/PlaceCard';
import { useRecoilState } from 'recoil';
import { cardShowState } from '../../recoil/cardShowAtom';

export default function Profile({ type }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);
  const [cardShow, setCardShow] = useRecoilState(cardShowState);
  const feedRef = useRef();

  useEffect(() => {
    if (
      !sessionStorage.getItem('_id') ||
      !sessionStorage.getItem('accountname') ||
      !sessionStorage.getItem('token')
    ) {
      navigate('/');
    }
  }, [navigate]);

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

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }

  const scrollToFeeds = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header type='profile' own={type} />
      <InfoProfile type={type} scrollToFeeds={scrollToFeeds} />
      <RatePlace cardOpen={cardOpen} cardClosed={cardClosed} />
      <FeedList feedRef={feedRef} />
      {cardShow && selectedId && (
        <PlaceCard cardClose={cardClose} id={selectedId} />
      )}
      <Nav />
    </>
  );
}
