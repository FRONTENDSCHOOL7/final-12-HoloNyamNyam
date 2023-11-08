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
import { useRecoilState } from 'recoil';
import { chatState } from '../../recoil/chatAtom';
import { userInfoState } from '../../recoil/userInfoAtom';

export default function BtnProfile({ type, id, setFollow, follow }) {
  const [, setChat] = useRecoilState(chatState);
  const [userInfo] = useRecoilState(userInfoState);
  const SocialSVG = ({ id, color = 'white', size = 20 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  function moveProfileEdit() {
    navigate('/myprofile/edit');
  }

  function moveMakePlace() {
    navigate('/MakePlace');
  }

  function moveChat(id) {
    navigate(`/chatroom/${id}`, {
      state: {
        accountname: id,
      },
    });
    setChat({
      type: 'new',
      id: null,
      name: '',
      image: [],
      text: [],
      time: '',
      date: [],
      reply: false,
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

  function kakaoProfileButton(userInfo) {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init('2df8baf0a061ee9ba8cfeadb844cdfb4');
      }

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `@${userInfo.accountname}`,
          description: userInfo.intro,
          imageUrl: userInfo.image,
          link: {
            mobileWebUrl: 'https://holonyam.netlify.app/',
            webUrl: 'https://holonyam.netlify.app/',
          },
        },
        itemContent: {
          profileText: userInfo.username,
        },
        buttons: [
          {
            title: '프로필 구경하기',
            link: {
              mobileWebUrl: 'https://holonyam.netlify.app/',
              webUrl: 'https://holonyam.netlify.app/',
            },
          },
        ],
      });
    }
  }

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
          <CircleBtn
            type='button'
            onClick={() => kakaoProfileButton(userInfo)}
            title='프로필 카카오톡으로 공유하기'
          >
            <SocialSVG id='icon-share' />
            <p className='a11y-hidden'>공유 버튼</p>
          </CircleBtn>
          <CircleBtn
            type='button'
            onClick={() => moveChat(id)}
            title='채팅하기'
          >
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
          냠냠평가 등록
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
