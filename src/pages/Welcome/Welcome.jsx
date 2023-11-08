import React, { useEffect } from 'react';
import LogoWhiteImg from '../../images/Logo_white.svg';
import { Container, Logo, Login, Join } from './WelcomeStyle';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem('_id') ||
      sessionStorage.getItem('accountname') ||
      sessionStorage.getItem('token')
    ) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <Container>
      <Logo src={LogoWhiteImg} alt='로고' />
      <Login to='/login'>로그인 할래요</Login>
      <Join to='/signup'>회원가입 할래요</Join>
    </Container>
  );
}
