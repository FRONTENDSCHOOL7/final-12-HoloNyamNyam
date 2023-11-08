import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoBowlImg from '../../images/logo_bowl.svg';
import LogoNameImg from '../../images/logo_name.svg';
import { Appear, LogoBowl, LogoName } from './SplashStyle';

export default function Splash() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (
      sessionStorage.getItem('_id') ||
      sessionStorage.getItem('accountname') ||
      sessionStorage.getItem('token')
    ) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setTimeout(() => {
          navigate('/home');
        }, 500);
      }, 3000);
    } else {
      const timer = setTimeout(() => {
        setTimeout(() => {
          navigate('/welcome');
        }, 500);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate, token]);

  return (
    <Appear>
      <LogoBowl src={LogoBowlImg} alt='' className='logo bowl' />
      <LogoName src={LogoNameImg} alt='' className='logo name' />
    </Appear>
  );
}
