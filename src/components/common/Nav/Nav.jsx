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
  SvgDiv,
} from './StyledNav';
import sprite from '../../../images/sprite-nav.svg';
import topIcon from '../../../images/arrow_top.svg';
import { useSetRecoilState } from 'recoil';
import { feedState } from '../../../recoil/feedEditAtom';

export default function Nav() {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const setFeed = useSetRecoilState(feedState);

  const NavSVG = ({ id, color, size = 24 }) => (
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

  function newFeed() {
    setFeed({ type: 'new', id: null, images: [], text: '' });
    if (location.pathname === '/feedupload') window.location.reload();
  }

  return (
    <NavWrapper>
      <ButtonContainer>
        {showButton && (
          <ScrollButton
            onClick={scrollToTop}
            type='button'
            title='상단으로 이동해요.'
          >
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
            <SvgDiv scale={location.pathname === '/home' ? 1.2 : 1}>
              <NavSVG
                id={
                  location.pathname === '/home' ? 'icon-home-fill' : 'icon-home'
                }
              />
            </SvgDiv>
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
            <SvgDiv scale={location.pathname === '/search' ? 1.2 : 1}>
              <NavSVG
                id={
                  location.pathname === '/search'
                    ? 'icon-search-fill'
                    : 'icon-search'
                }
              />
            </SvgDiv>
            <StyledNavText>검색</StyledNavText>
          </NavLink>
        </li>
        <li onClick={() => newFeed()}>
          <NavLink
            to='/feedupload'
            className={`nav-link ${
              location.pathname === '/feedupload' ? 'active' : ''
            }`}
          >
            <SvgDiv scale={location.pathname === '/feedupload' ? 1.2 : 1}>
              <NavSVG
                id={
                  location.pathname === '/feedupload'
                    ? 'icon-edit-fill'
                    : 'icon-edit'
                }
              />
            </SvgDiv>
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
            <SvgDiv scale={location.pathname === '/chat' ? 1.2 : 1}>
              <NavSVG
                id={
                  location.pathname === '/chat'
                    ? 'icon-message-fill'
                    : 'icon-message'
                }
              />
            </SvgDiv>
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
            <SvgDiv scale={location.pathname === '/myprofile' ? 1.2 : 1}>
              <NavSVG
                id={
                  location.pathname === '/myprofile'
                    ? 'icon-user-fill'
                    : 'icon-user'
                }
              />
            </SvgDiv>
            <StyledNavText>프로필</StyledNavText>
          </NavLink>
        </li>
      </NavList>
    </NavWrapper>
  );
}
