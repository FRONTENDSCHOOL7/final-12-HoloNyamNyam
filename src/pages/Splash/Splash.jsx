import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoBowlImg from '../../images/logo_bowl.svg';
import LogoNameImg from '../../images/logo_name.svg';
import { Appear, LogoBowl, LogoName } from './SplashStyle';

export default function Splash() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          navigate('/home');
        }, 500);
      }, 3000);
    } else {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          navigate('/welcome');
        }, 500);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate, token]);

  return (
    <Appear fadeOut={fadeOut}>
      <LogoBowl src={LogoBowlImg} alt='' className='logo bowl' />
      <LogoName src={LogoNameImg} alt='' className='logo name' />
    </Appear>
  );
}
