import styled from 'styled-components';

const Container = styled.article`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
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
  cursor: pointer;
`;
const FeedText = styled.p`
  margin-bottom: 17px;
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
const BtnLike = styled.button`
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
`;
const BtnComment = styled.button`
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
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
};
