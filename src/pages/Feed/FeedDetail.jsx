import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import FeedComment from '../../components/Feed/FeedComment/FeedComment';

export default function FeedDetail() {
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
      <h1 className='a11y-hidden'>게시물 상세 페이지</h1>
      <Header type='profile' />
      <FeedComment />
    </>
  );
}
