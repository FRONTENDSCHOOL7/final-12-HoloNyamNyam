import React, { useEffect } from 'react';
import SignUpForm from '../../components/Signup/SignUpForm';
import { SimpleLoginWrap, SnsButton, SnsList } from '../Login/StyledLogin';
import sprite from '../../images/SpriteIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
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
      <SignUpForm />
      <SimpleLoginWrap data-content='간편 회원가입'>
        <h2 className='a11y-hidden'>소셜서비스로 회원가입</h2>
        <SnsList>
          <li>
            <SnsButton
              $color='kakao'
              type='button'
              title='카카오 계정으로 회원가입'
            >
              <SnsSVG id='kakao' />
              <h3 className='a11y-hidden'>카카오 계정으로 회원가입</h3>
            </SnsButton>
          </li>
          <li>
            <SnsButton
              $color='google'
              type='button'
              title='구글 계정으로 회원가입'
            >
              <SnsSVG id='google' />
              <h3 className='a11y-hidden'>구글 계정으로 회원가입</h3>
            </SnsButton>
          </li>
          <li>
            <SnsButton
              $color='github'
              type='button'
              title='깃허브 계정으로 회원가입'
            >
              <SnsSVG id='github' />
              <h3 className='a11y-hidden'>깃허브 계정으로 회원가입</h3>
            </SnsButton>
          </li>
          <li>
            <SnsButton
              $color='facebook'
              type='button'
              title='페이스북 계정으로 회원가입'
            >
              <SnsSVG id='facebook' />
              <h3 className='a11y-hidden'>페이스북 계정으로 회원가입</h3>
            </SnsButton>
          </li>
        </SnsList>
      </SimpleLoginWrap>
    </>
  );
}
