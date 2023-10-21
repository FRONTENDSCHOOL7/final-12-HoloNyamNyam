import React, { useEffect, useState } from 'react';
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
  const NavSVG = ({ id, color = 'white', size = 24 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} style={{ stroke: 'currentColor' }} />
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
          <NavSVG id='icon-home-fill' />
          <StyledNavText>홈</StyledNavText>
        </li>
        <li>
          <NavSVG id='icon-search' />
          <StyledNavText>검색</StyledNavText>
        </li>
        <li>
          <NavSVG id='icon-edit' />
          <StyledNavText>게시물 작성</StyledNavText>
        </li>
        <li>
          <NavSVG id='icon-message-circle' />
          <StyledNavText>채팅</StyledNavText>
        </li>
        <li>
          <NavSVG id='icon-user-fill' />
          <StyledNavText>프로필</StyledNavText>
        </li>
      </NavList>
    </NavWrapper>
  );
}
