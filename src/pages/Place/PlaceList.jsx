import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import PlaceListItem from '../../components/Place/PlaceListItem';
import Nav from '../../components/common/Nav/Nav';
import styled from 'styled-components';
import PlaceCard from '../../components/Modal/PlaceCard/PlaceCard';
import { useRecoilState } from 'recoil';
import { cardShowState } from '../../recoil/cardShowAtom';
import { useLocation } from 'react-router-dom';

const List = styled.section`
  padding: 48px 0 81px 0;
  background-color: white;
  height: 100%;
`;

const PlaceWrap = styled.ul`
  padding: 20px 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function PlaceList() {
  const [selectedId, setSelectedId] = useState(null);
  const [cardClosed, setCardClosed] = useState(false);
  const [name, setName] = useState('');
  const location = useLocation();
  const { nickname } = location.state || {};

  useEffect(() => {
    if (nickname) {
      setName(nickname.name);
      localStorage.setItem('nickname', nickname.name);
    } else {
      setName(localStorage.getItem('nickname'));
    }
  }, [nickname]);

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
      <Header type='matzip' name={name} />
      <List>
        <PlaceWrap>
          <PlaceListItem cardOpen={cardOpen} cardClosed={cardClosed} />
          {cardShow && selectedId && (
            <PlaceCard cardClose={cardClose} id={selectedId} />
          )}
        </PlaceWrap>
      </List>
      <Nav />
    </>
  );
}
