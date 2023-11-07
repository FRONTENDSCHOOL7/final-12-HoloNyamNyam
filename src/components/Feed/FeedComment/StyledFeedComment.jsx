import styled from 'styled-components';

const DetailFeedWrapper = styled.section`
  width: 100%;
  height: 100vh;
  /* margin-top: 48px; */
  padding: 68px 0 0px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const FeedItemSection = styled.section`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;
const WriteCommentSection = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  gap: 18px;
  padding: 12.5px 16px;
  justify-content: baseline;
  background-color: #fff;
  width: 100%;
  max-width: 390px;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
`;

const WriteComment = styled.input`
  padding: 0 7px 0 7px;
  border: none;
  flex-grow: 1;
`;

const BtnDisplay = styled.button`
  color: ${({ $hastext }) => ($hastext ? '#F26E22' : '#C4C4C4')};
  transition: transform 0.2s ease 0s;
  transform: scale(1);
  &:hover {
    transform: ${({ $hastext }) =>
      $hastext ? 'scale(1.2) translateX(0)' : ''};
  }
`;

const FeedUserImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
`;
const CommentSection = styled.section`
  width: 100%;
  padding: 5px 20px 65px;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
  background-color: #fff;
`;
const CommentWrapper = styled.ul`
  /* display: flex;
  flex-direction: column-reverse; */
`;
export {
  FeedItemSection,
  CommentSection,
  FeedUserImg,
  BtnDisplay,
  WriteComment,
  WriteCommentSection,
  DetailFeedWrapper,
  CommentWrapper,
};
