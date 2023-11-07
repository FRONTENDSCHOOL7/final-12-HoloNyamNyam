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
  LikeAnimaiton,
  CommentAnimaiton,
} from './StyledFeedItem';
import { feedLikeApi, feedUnlikeApi } from '../../../api/feed';
import sprite from '../../../images/SpriteIcon.svg';
import Carousel from '../../Carousels/Carousel';

export default function FeedItem({
  modalOpen,
  feedInfo,
  otherInfo,
  getUserInfo,
  commentCnt,
  detail,
}) {
  const SocialSVG = ({
    id,
    color = 'white',
    size = 20,
    strokeColor = '#767676',
    onClick,
    margin = '0',
  }) => (
    <SocialSvg onClick={onClick} style={{ margin: margin }}>
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} style={{ stroke: 'strokeColor' }} />
      </svg>
    </SocialSvg>
  );

  const infoToIterate = feedInfo || otherInfo;
  const navigate = useNavigate();
  const [isHearted, setIsHearted] = useState(infoToIterate.hearted);
  const [heartCnt, setHeartCnt] = useState(infoToIterate.heartCount);

  const feedLike = async () => {
    const token = sessionStorage.getItem('token');
    try {
      if (isHearted) {
        await feedUnlikeApi(infoToIterate.id, token);
        setIsHearted(!isHearted);
        setHeartCnt(heartCnt - 1);
      } else {
        await feedLikeApi(infoToIterate.id, token);
        setIsHearted(!isHearted);
        setHeartCnt(heartCnt + 1);
      }
    } catch (error) {
      return false;
    }
  };

  function moveDetail(id) {
    navigate('/feeddetail', {
      state: {
        id: id,
        infoToIterate: infoToIterate,
      },
    });
  }

  function moveProfile(accountname) {
    const where = sessionStorage.getItem('accountname');
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
  }, [feedInfo]);

  return (
    <Container $dim={detail === true ? null : true}>
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
              onClick={() => modalOpen(infoToIterate.id)}
            />
          </MoreBtn>
        </FeedUser>
      )}
      <FeedContent>
        <FeedText
          onClick={detail === true ? null : () => moveDetail(infoToIterate.id)}
          style={{ cursor: detail === true ? 'default' : 'pointer' }}
        >
          {infoToIterate.content}
        </FeedText>
        {infoToIterate.image && infoToIterate.author && (
          <Carousel
            images={infoToIterate.image}
            userInfo={infoToIterate.author.username}
            onImageClick={
              detail === true ? null : () => moveDetail(infoToIterate.id)
            }
            detail={detail}
          />
        )}
        <FeedInfoBox>
          <FeedBtnBox>
            <BtnLike onClick={() => feedLike(infoToIterate.id)}>
              <LikeAnimaiton>
                {isHearted ? (
                  <SocialSVG id='icon-heart' color='red' strokeColor='red' />
                ) : (
                  <SocialSVG id='icon-heart' />
                )}
              </LikeAnimaiton>
              {heartCnt}
            </BtnLike>

            <BtnComment
              onClick={() => {
                moveDetail(infoToIterate.id);
              }}
            >
              <CommentAnimaiton>
                <SocialSVG id='icon-message-circle-2' />
              </CommentAnimaiton>
              {commentCnt}
            </BtnComment>
          </FeedBtnBox>
          <FeedDate>{formatDate(infoToIterate.createdAt)}</FeedDate>
        </FeedInfoBox>
      </FeedContent>
    </Container>
  );
}
