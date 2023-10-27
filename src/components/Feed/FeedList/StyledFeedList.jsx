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

const ImgBtn = styled.button`
  position: relative;
  width: 114px;
  height: 114px;
  cursor: pointer;

  &:hover ${ImgInfo} {
    width: 100%;
    height: 114px;
    display: flex;
    justify-content: center; // 가로 축 정렬
    align-items: center;
    flex-direction: column;
  }
`;

export { FeedListBtnWrap, ImgInfo, ImgBtn };
