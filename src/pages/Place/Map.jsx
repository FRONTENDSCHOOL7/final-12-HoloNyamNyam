import React from 'react';
import Header from '../../components/common/Header/Header';
import PlaceMap from '../../components/Map/PlaceMap';
import Nav from '../../components/common/Nav/Nav';

export default function Map() {
  return (
    <>
      <Header type='map' />
      <PlaceMap />
      <Nav />
    </>
  );
}
