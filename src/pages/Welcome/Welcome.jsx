import React from 'react';
import LogoWhiteImg from '../../images/Logo_white.svg';
import { Container, Logo, Login, Join } from './WelcomeStyle';

export default function Welcome() {
  return (
    <Container>
      <Logo src={LogoWhiteImg} alt='로고' />
      <Login to='/login'>로그인 할래요</Login>
      <Join to='/signup'>회원가입 할래요</Join>
    </Container>
  );
}
