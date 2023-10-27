import React from 'react';
import {
  LoginWrap,
  LoginTitle,
  SignUpLink,
  SimpleLoginWrap,
  SnsButton,
  SnsList,
} from './StyledLogin';
import LoginForm from '../../components/Login/LoginForm';
import sprite from '../../images/SpriteIcon.svg';

export default function Login() {
  const SnsSVG = ({ id, size = 24 }) => (
    <svg width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  return (
    <>
      <h1 className='a11y-hidden'>로그인 페이지</h1>
      <LoginWrap>
        <LoginTitle>로그인을 도와드릴게요!</LoginTitle>
        <LoginForm />
        <SignUpLink to='/signup'>계정을 만들러 갈까요?</SignUpLink>
        <SimpleLoginWrap>
          <h2 className='a11y-hidden'>소셜서비스로 로그인</h2>
          <SnsList>
            <li>
              <SnsButton $color='kakao'>
                <SnsSVG id='kakao' />
                <h3 className='a11y-hidden'>카카오 계정으로 로그인</h3>
              </SnsButton>
            </li>
            <li>
              <SnsButton $color='google'>
                <SnsSVG id='google' />
                <h3 className='a11y-hidden'>구글 계정으로 로그인</h3>
              </SnsButton>
            </li>
            <li>
              <SnsButton $color='github'>
                <SnsSVG id='github' />
                <h3 className='a11y-hidden'>깃허브 계정으로 로그인</h3>
              </SnsButton>
            </li>
            <li>
              <SnsButton $color='facebook'>
                <SnsSVG id='facebook' />
                <h3 className='a11y-hidden'>페이스북 계정으로 로그인</h3>
              </SnsButton>
            </li>
          </SnsList>
        </SimpleLoginWrap>
      </LoginWrap>
    </>
  );
}
