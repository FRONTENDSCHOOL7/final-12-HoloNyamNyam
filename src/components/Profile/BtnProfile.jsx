import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileBtnSection,
  FollowBtn,
  CircleBtn,
  CircleBtnWrap,
  MyBtn,
  MyBtnSection,
} from './StyledBtnProfile';
import sprite from '../../images/SpriteIcon.svg';
import { followApi, unfollowApi } from '../../api/follow';

export default function BtnProfile({ type, id, setFollow, follow }) {
  const SocialSVG = ({ id, color = 'white', size = 20 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function moveProfileEdit() {
    navigate('/myprofile/edit');
  }

  function moveMakePlace() {
    navigate('/MakePlace');
  }

  function moveChat(id) {
    navigate(`/chatroom/${id}`, {
      state: {
        yourAccountname: id,
      },
    });
  }

  const FollowClick = async () => {
    try {
      await followApi(id, token);
      setFollow(!follow);
    } catch (err) {
      console.error('에러!', err);
      navigate('/error');
    }
  };

  const UnFollowClick = async () => {
    try {
      await unfollowApi(id, token);
      setFollow(!follow);
    } catch (err) {
      console.error('에러!', err);
      navigate('/error');
    }
  };

  const User = {
    your: (
      <ProfileBtnSection>
        {follow ? (
          <FollowBtn
            type='button'
            size='m'
            width='m'
            $bgcolor='active'
            onClick={FollowClick}
          >
            팔로우
          </FollowBtn>
        ) : (
          <FollowBtn
            type='button'
            size='ms'
            width='m'
            $border='active'
            color='active'
            onClick={UnFollowClick}
          >
            팔로잉
          </FollowBtn>
        )}
        <CircleBtnWrap>
          <CircleBtn type='button'>
            <SocialSVG id='icon-share' />
            <p className='a11y-hidden'>공유 버튼</p>
          </CircleBtn>
          <CircleBtn type='button' onClick={() => moveChat(id)}>
            <SocialSVG id='icon-message-circle-1' />
            <p className='a11y-hidden'>채팅 버튼</p>
          </CircleBtn>
        </CircleBtnWrap>
      </ProfileBtnSection>
    ),
    my: (
      <MyBtnSection>
        <MyBtn
          type='button'
          size='ms'
          $border='active'
          color='active'
          onClick={moveMakePlace}
        >
          맛집 등록
        </MyBtn>
        <MyBtn
          type='button'
          size='ms'
          $border='active'
          color='active'
          onClick={moveProfileEdit}
        >
          프로필 수정
        </MyBtn>
      </MyBtnSection>
    ),
  };

  return User[type];
}
