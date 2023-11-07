import React from 'react';
import sprite from '../../images/SpriteIcon.svg';
import {
  StyledComment,
  SocialSvg,
  StyledCommentUserInfo,
  CommentUserProfile,
  StyledCommentContent,
  CommentContent,
  MoreBtn,
} from './StyledComment';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/modalAtom';

export default function Comment({ commentList, feedId, moveProfile }) {
  const where = sessionStorage.getItem('accountname');
  const SocialSVG = ({
    id,
    color = 'white',
    size = 20,
    strokeColor = '#767676',
    onClick,
  }) => (
    <SocialSvg onClick={onClick}>
      <svg fill={color} width={size} height={size} stroke={strokeColor}>
        <use href={`${sprite}#${id}`} style={{ stroke: 'strokeColor' }} />
      </svg>
    </SocialSvg>
  );

  const elapsedTime = (commentDate) => {
    const now = new Date();
    const commentTime = new Date(commentDate);
    const elapsedSeconds = Math.floor((now - commentTime) / 1000);

    const times = [
      { name: '년', seconds: 60 * 60 * 24 * 365 },
      { name: '개월', seconds: 60 * 60 * 24 * 30 },
      { name: '일', seconds: 60 * 60 * 24 },
      { name: '시간', seconds: 60 * 60 },
      { name: '분', seconds: 60 },
    ];

    for (const value of times) {
      const elapsed = Math.floor(elapsedSeconds / value.seconds);

      if (elapsed > 0) {
        return `${elapsed}${value.name} 전`;
      }
    }
    return '방금 전';
  };

  // eslint-disable-next-line no-unused-vars
  const [modal, setModal] = useRecoilState(modalState);
  const modalOpen = (type, id, feedId, accountname) => {
    setModal({
      show: true,
      type,
      commentId: id,
      feedId: feedId,
      accountname: accountname,
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {commentList?.map((comment) => {
        return (
          <StyledComment key={comment.id}>
            <CommentUserProfile
              src={comment.author.image}
              alt='유저의 프로필'
              onClick={() => {
                moveProfile(comment.author.accountname);
              }}
            />
            <StyledCommentContent>
              <StyledCommentUserInfo>
                <h3>{comment.author.username}</h3>
                <p>{elapsedTime(comment.createdAt)}</p>
              </StyledCommentUserInfo>
              <CommentContent>{comment.content}</CommentContent>
            </StyledCommentContent>
            <MoreBtn>
              <SocialSVG
                id='icon-more-vertical'
                onClick={() =>
                  modalOpen(
                    where === comment.author.accountname
                      ? 'myComment'
                      : 'yourComment',
                    comment.id,
                    feedId,
                    comment.author.accountname,
                  )
                }
              />
            </MoreBtn>
          </StyledComment>
        );
      })}
    </>
  );
}
