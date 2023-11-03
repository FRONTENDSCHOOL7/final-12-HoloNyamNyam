import styled from 'styled-components';

const FollowList = styled.ul`
  padding: 60px 16px 64px;
  background-color: #fff;
`;

const FollowListItem = styled.li`
  margin-bottom: 12px;
  cursor: pointer;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 130px);
`;

const NoFollowCryImg = styled.img`
  background-color: #fff;
`;

const NoFollowP = styled.p`
  color: #c4c4c4;
  padding-left: 5px;
`;

export { FollowList, FollowListItem, NoFollowCryImg, ImgWrap, NoFollowP };
