// import React, { useState } from 'react';
import React from 'react';
import {
  HeaderWrap,
  HeaderLayoutSection,
  HeaderTitle,
  HeaderLeftBtn,
  HeaderRightBtn,
  HeaderSearchInp,
  HeaderSpan,
  HeaderTextP,
  SocialSvg,
  ButtonWrap,
  SortButton,
  Star,
} from './StyledHeader';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import sprite from '../../../images/SpriteIcon.svg';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import StarImg from '../../../images/Star.svg';

export default function Header({
  type,
  uploadHandler,
  searchKeyword,
  handleSearchKeyword,
  handleUploadBtn,
  yourAccountname,
}) {
  const SocialSVG = ({
    id,
    color = 'white',
    size = 24,
    strokeColor = '#767676',
    onClick,
  }) => (
    <SocialSvg onClick={onClick}>
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} />
      </svg>
    </SocialSvg>
  );
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const modalOpen = () => {
    setModal({ show: true, type: 'myProfile' });
  };
  function renderHeaderLeftBtn() {
    return (
      <HeaderLeftBtn type='button' aria-label='뒤로가기 버튼'>
        <SocialSVG id='icon-arrow-left' onClick={() => navigate(-1)} />
      </HeaderLeftBtn>
    );
  }
  function renderHeaderText(text) {
    return (
      <HeaderSpan>
        <HeaderLeftBtn type='button' aria-label='뒤로가기 버튼'>
          <SocialSVG id='icon-arrow-left' onClick={() => navigate(-1)} />
        </HeaderLeftBtn>
        <HeaderTextP>{text}</HeaderTextP>
      </HeaderSpan>
    );
  }

  function renderHeaderRightBtn() {
    return (
      <HeaderRightBtn
        type='button'
        onClick={modalOpen}
        aria-label='더보기 버튼'
      >
        <SocialSVG id='icon-more-vertical' />
      </HeaderRightBtn>
    );
  }

  const UI = {
    home: (
      <HeaderLayoutSection>
        <HeaderTitle>냠냠피드</HeaderTitle>
      </HeaderLayoutSection>
    ),
    search: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>Search</HeaderTitle>
        {renderHeaderLeftBtn()}
        <HeaderSearchInp
          type='text'
          placeholder='또 다른 혼바비언을 찾아봐요 :D'
          value={searchKeyword}
          onChange={handleSearchKeyword}
        />
      </HeaderLayoutSection>
    ),
    profile: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>프로필</HeaderTitle>
        {renderHeaderLeftBtn()}
        {renderHeaderRightBtn()}
      </HeaderLayoutSection>
    ),
    followers: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>팔로워</HeaderTitle>
        {renderHeaderText('냠냠 팔로워')}
      </HeaderLayoutSection>
    ),
    followings: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>팔로잉</HeaderTitle>
        {renderHeaderText('냠냠 팔로잉')}
      </HeaderLayoutSection>
    ),
    upload: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>게시물 작성</HeaderTitle>
        {renderHeaderLeftBtn()}
        <Button
          type='button'
          content='업로드'
          size='ms'
          width='ms'
          bgColor={handleUploadBtn ? 'active' : 'inactive'}
          disabled={!handleUploadBtn}
          onClick={uploadHandler}
        />
      </HeaderLayoutSection>
    ),
    chat: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>채팅</HeaderTitle>
        {renderHeaderText(`@ ${yourAccountname}`)}
        {renderHeaderRightBtn()}
      </HeaderLayoutSection>
    ),
    map: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>카카오맵</HeaderTitle>
        {renderHeaderText('카카오맵')}
        {renderHeaderRightBtn()}
      </HeaderLayoutSection>
    ),
    default: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>프로필 수정</HeaderTitle>
        {renderHeaderText()}
      </HeaderLayoutSection>
    ),
    matzip: (
      <HeaderLayoutSection>
        <HeaderTitle className='a11y-hidden'>냠냠평가</HeaderTitle>
        {renderHeaderText('냠냠평가')}
        <ButtonWrap>
          <SortButton>
            <Star src={StarImg} />
            &nbsp;별점순으로 보기&nbsp;
          </SortButton>
        </ButtonWrap>
      </HeaderLayoutSection>
    ),
  };

  return <HeaderWrap>{UI[type]}</HeaderWrap>;
}
