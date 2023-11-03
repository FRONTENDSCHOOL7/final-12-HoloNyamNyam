import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  NavWrapper,
  NavList,
  NavLink,
  StyledNavText,
  ScrollButton,
  TopIcon,
  ButtonContainer,
} from './StyledNav';
import sprite from '../../../images/navigationIcon.svg';
import topIcon from '../../../images/arrow_top.svg';

export default function Nav() {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const NavSVG = ({ id, color = 'white', size = 24 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const showButtonClick = () => {
      if (window.scrollY > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', showButtonClick);
    return () => {
      window.removeEventListener('scroll', showButtonClick);
    };
  }, []);

  return (
    <NavWrapper>
      <ButtonContainer>
        {showButton && (
          <ScrollButton onClick={scrollToTop}>
            <TopIcon src={topIcon} alt='Top' />
          </ScrollButton>
        )}
      </ButtonContainer>
      <NavList>
        <li>
          <NavLink
            to='/home'
            className={`nav-link ${
              location.pathname === '/home' ? 'active' : ''
            }`}
          >
            <NavSVG
              id={
                location.pathname === '/home' ? 'icon-home-fill' : 'icon-home'
              }
            />
            <StyledNavText>홈</StyledNavText>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/search'
            className={`nav-link ${
              location.pathname === '/search' ? 'active' : ''
            }`}
          >
            <NavSVG
              id={
                location.pathname === '/search'
                  ? 'icon-search-fill'
                  : 'icon-search'
              }
            />
            <StyledNavText>검색</StyledNavText>
          </NavLink>
        </li>
        <li>
          <NavLink to='/feedupload'>
            <NavSVG
              id={
                location.pathname === '/feedupload'
                  ? 'icon-edit-fill'
                  : 'icon-edit'
              }
            />
            <StyledNavText>게시물 작성</StyledNavText>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/chat'
            className={`nav-link ${
              location.pathname === '/chat' ? 'active' : ''
            }`}
          >
            <NavSVG
              id='icon-message-circle'
              color={location.pathname === '/chat' ? '#f26e22' : 'white'}
            />
            <StyledNavText>채팅</StyledNavText>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/myprofile'
            className={`nav-link ${
              location.pathname === '/myprofile' ? 'active' : ''
            }`}
          >
            <NavSVG
              id={
                location.pathname === '/myprofile'
                  ? 'icon-user-fill'
                  : 'icon-user'
              }
            />
            <StyledNavText>프로필</StyledNavText>
          </NavLink>
        </li>
      </NavList>
    </NavWrapper>
  );
}
