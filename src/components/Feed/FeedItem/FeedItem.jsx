import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BtnComment,
  BtnLike,
  FeedBtnBox,
  FeedContent,
  FeedDate,
  FeedInfoBox,
  FeedText,
  FeedUser,
  FeedUserBox,
  FeedUserId,
  FeedUserImg,
  FeedUserName,
  Container,
  SocialSvg,
  MoreBtn,
} from './StyledFeedItem';
import { FeedLikeApi, FeedUnlikeApi } from '../../../api/feed';
import sprite from '../../../images/SpriteIcon.svg';
import Carousel from '../../Carousels/Carousel';

export default function FeedItem({
  FeedInfo,
  // modalOpen,
  otherInfo,
  getUserInfo,
  commentCnt,
}) {
  const SocialSVG = ({
    id,
    color = 'white',
    size = 20,
    strokeColor = '#767676',
    // onClick,
    margin = '0',
  }) => (
    <SocialSvg
      // onClick={onClick}
      style={{ margin: margin }}
    >
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} style={{ stroke: 'strokeColor' }} />
      </svg>
    </SocialSvg>
  );

  const infoToIterate = FeedInfo || otherInfo;
  const navigate = useNavigate();
  const [isHearted, setIsHearted] = useState(infoToIterate.hearted);
  const [heartCnt, setHeartCnt] = useState(infoToIterate.heartCount);

  function moveDetail(id) {
    navigate('/detailfeed', {
      state: {
        id: id,
        infoToIterate: infoToIterate,
      },
    });
  }
  const FeedLike = async () => {
    const token = localStorage.getItem('token');
    try {
      if (isHearted) {
        await FeedUnlikeApi(infoToIterate.id, token);
        setIsHearted(!isHearted);
        setHeartCnt(heartCnt - 1);
      } else {
        await FeedLikeApi(infoToIterate.id, token);
        setIsHearted(!isHearted);
        setHeartCnt(heartCnt + 1);
      }
      if (getUserInfo) {
        getUserInfo();
      }
    } catch (error) {
      return false;
    }
  };
  function moveProfile(accountname) {
    const where = localStorage.getItem('accountname');
    if (accountname === where) {
      navigate('/myprofile', {
        state: {
          accountname: accountname,
        },
      });
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
  }
  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  useEffect(() => {
    if (infoToIterate.hearted !== isHearted) {
      setIsHearted(!isHearted);
      setHeartCnt(infoToIterate.heartCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FeedInfo]);

  return (
    <Container>
      {infoToIterate && infoToIterate.author && (
        <FeedUser>
          <FeedUserImg
            src={infoToIterate.author.image}
            alt='사용자 이미지'
            onClick={() => moveProfile(infoToIterate.author.accountname)}
          />
          <FeedUserBox
            onClick={() => moveProfile(infoToIterate.author.accountname)}
          >
            <FeedUserName>{infoToIterate.author.username}</FeedUserName>
            <FeedUserId>@ {infoToIterate.author.accountname}</FeedUserId>
          </FeedUserBox>
          <MoreBtn aria-label='더보기 버튼'>
            <SocialSVG
              id='icon-more-vertical'
              strokeColor='#c4c4c4'
              margin='0 0 0 0 auto'
              // onClick={() => modalOpen(infoToIterate.id)}
            />
          </MoreBtn>
        </FeedUser>
      )}
      <FeedContent>
        <FeedText>{infoToIterate.content}</FeedText>
        {infoToIterate.image && infoToIterate.author && (
          <Carousel
            images={infoToIterate.image}
            userInfo={infoToIterate.author.username}
            onImageClick={() => {
              moveDetail(infoToIterate.id);
            }}
          />
        )}
        <FeedInfoBox>
          <FeedBtnBox>
            <BtnLike onClick={() => FeedLike(infoToIterate.id)}>
              {isHearted ? (
                <SocialSVG id='icon-heart' color='red' strokeColor='red' />
              ) : (
                <SocialSVG id='icon-heart' />
              )}
              {heartCnt}
            </BtnLike>

            <BtnComment
              onClick={() => {
                moveDetail(infoToIterate.id);
              }}
            >
              <SocialSVG id='icon-message-circle-1' />
              {commentCnt}
            </BtnComment>
          </FeedBtnBox>
          <FeedDate>{formatDate(infoToIterate.createdAt)}</FeedDate>
        </FeedInfoBox>
      </FeedContent>
    </Container>
  );
}
