import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import FeedHome from '../../components/Feed/FeedHome/FeedHome';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('_id')) {
      navigate('/');
    }
  }, [navigate]);

  if (!sessionStorage.getItem('_id')) {
    return null;
  }

  return (
    <>
      <Header type='home' />
      <FeedHome />
      <Nav />
    </>
  );
}
