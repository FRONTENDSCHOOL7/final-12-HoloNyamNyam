import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const SnsSVG = ({ id, size = 24 }) => (
    <svg width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

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
    <>
      <h1 className='a11y-hidden'>로그인 페이지</h1>
      <LoginWrap>
        <LoginTitle>로그인을 도와드릴게요!</LoginTitle>
        <LoginForm />
        <SignUpLink to='/signup'>계정을 만들러 갈까요?</SignUpLink>
        <SimpleLoginWrap data-content='간편 로그인'>
          <h2 className='a11y-hidden'>소셜서비스로 로그인</h2>
          <SnsList>
            <li>
              <SnsButton
                $color='kakao'
                type='button'
                title='카카오 계정으로 로그인'
              >
                <SnsSVG id='kakao' />
                <h3 className='a11y-hidden'>카카오 계정으로 로그인</h3>
              </SnsButton>
            </li>
            <li>
              <SnsButton
                $color='google'
                type='button'
                title='구글 계정으로 로그인'
              >
                <SnsSVG id='google' />
                <h3 className='a11y-hidden'>구글 계정으로 로그인</h3>
              </SnsButton>
            </li>
            <li>
              <SnsButton
                $color='github'
                type='button'
                title='깃허브 계정으로 로그인'
              >
                <SnsSVG id='github' />
                <h3 className='a11y-hidden'>깃허브 계정으로 로그인</h3>
              </SnsButton>
            </li>
            <li>
              <SnsButton
                $color='facebook'
                type='button'
                title='페이스북 계정으로 로그인'
              >
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
