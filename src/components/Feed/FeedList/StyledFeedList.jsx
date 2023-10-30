import styled from 'styled-components';

const FeedListBtnWrap = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  gap: 16px;
  padding-right: 16px;
`;

const ImgInfo = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: none;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
`;

const FeedItemList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin: 16px 20px 60px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 50px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

const FeedListItem = styled.li`
  width: 100%;
`;

const GridItemWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 114px);
  gap: 8px;
  padding: 16px 16px 80px 16px;
  height: 100%;
  min-height: 425px;
  background-color: white;
`;

const GridItemList = styled.li`
  display: ${(props) => (props.$hasimage ? 'none' : 'block')};
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  z-index: 10;
  right: 0%;
  top: 0;
`;

const Icon = styled.img`
  width: 10px;
  height: 10px;
`;

const GridIconImg = styled.img`
  width: 30px;
  object-fit: contain;
  margin-right: 10px;
`;

const ImgBtn = styled.button`
  position: relative;
  width: 114px;
  height: 114px;
  cursor: pointer;

  & img:not(${GridIconImg}) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover ${ImgInfo} {
    width: 100%;
    height: 114px;
    display: flex;
    justify-content: center; // 가로 축 정렬
    align-items: center;
    flex-direction: column;
  }
`;

const Likes = styled.div`
  width: 100%;
  font-weight: bold;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Comments = styled.div`
  width: 100%;
  font-weight: bold;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const NoFeedWrap = styled.section`
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #767676;
  padding-bottom: 61px;
  justify-content: center;
  gap: 20px;
`;

const NoFeedImg = styled.img``;
const NoFeedP = styled.p`
  font-size: 14px;
`;

export {
  FeedListBtnWrap,
  ImgInfo,
  ImgBtn,
  FeedItemList,
  FeedListItem,
  GridItemWrap,
  GridItemList,
  IconContainer,
  Icon,
  Likes,
  Comments,
  NoFeedImg,
  NoFeedWrap,
  NoFeedP,
};
