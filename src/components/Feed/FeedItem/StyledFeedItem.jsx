import styled, { keyframes } from 'styled-components';

const Container = styled.article`
  position: relative;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  ${(props) =>
    props.$dim === true
      ? `&:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  transition: background-color 0.2s ease;`
      : null}
`;
const FeedUser = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
`;
const FeedUserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const FeedUserBox = styled.div`
  align-self: center;
  cursor: pointer;
`;
const FeedUserName = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`;
const FeedUserId = styled.p`
  font-size: 12px;
  color: #767676;
`;
const FeedContent = styled.div`
  width: 100%;
  margin: 17px 0;
  font-size: 14px;
  line-height: 17px;
  word-break: break-all;
`;
const FeedText = styled.p`
  margin-bottom: 17px;
  white-space: pre-wrap;
`;
const FeedImg = styled.img`
  display: block;
  width: 100%;
  height: 228px;
  margin-bottom: 12px;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
  object-fit: cover;
`;
const FeedInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FeedBtnBox = styled.div`
  display: flex;
  gap: 16px;
`;
const FeedDate = styled.p`
  font-size: 10px;
  color: #767676;
`;

const heart = keyframes`
	0% {transform: scale(1.2);}
	10% {transform: scale(0.9);}
	20% {transform: scale(1.2);}
	30% {transform: scale(0.9);}
	40% {transform: scale(1.2);}
	50% {transform: scale(0.9);}
	60% {transform: scale(1.2);}
	70% {transform: scale(0.9);}
	80% {transform: scale(1.2);}
	90% {transform: scale(0.9);}
	100% {transform: scale(1.2);}
`;

const BtnLike = styled.button`
  height: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #767676;
`;

const LikeAnimaiton = styled.div`
  &:hover {
    animation-duration: 2s;
    animation-name: ${heart};
    animation-iteration-count: infinite;
  }
`;

const BtnComment = styled.button`
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #767676;
`;

const comment = keyframes`
	0%, 50% {transform: rotate(0deg);}
	5%, 15%, 25%, 35%, 45%  {transform: rotate(13deg);}
	10%, 20%, 30%, 40% {transform: rotate(-13deg);}
`;

const CommentAnimaiton = styled.div`
  &:hover {
    animation-duration: 2s;
    animation-name: ${comment};
    animation-iteration-count: infinite;
  }
`;

const SocialSvg = styled.div`
  height: 20px;
  margin-left: auto;
`;
const MoreBtn = styled.button`
  margin-left: auto;
`;

export {
  BtnComment,
  BtnLike,
  FeedBtnBox,
  FeedContent,
  FeedDate,
  FeedImg,
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
};
