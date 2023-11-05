import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import PlaceMap from '../../components/Map/PlaceMap';
import Nav from '../../components/common/Nav/Nav';

export default function Map() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !sessionStorage.getItem('_id') ||
      !sessionStorage.getItem('accountname') ||
      !sessionStorage.getItem('token')
    ) {
      navigate('/');
    }
  }, [navigate]);

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }
  return (
    <>
      <Header type='map' />
      <PlaceMap />
      <Nav />
    </>
  );
}
