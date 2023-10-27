import React from 'react';
import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import InfoProfile from '../../components/Profile/InfoProfile';
import FeedList from '../../components/Feed/FeedList/FeedList';

export default function Profile({ type }) {
  return (
    <>
      <Header type='profile' />
      <InfoProfile type={type} />
      <FeedList />
      <Nav />
    </>
  );
}
