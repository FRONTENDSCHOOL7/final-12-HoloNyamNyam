import styled from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';

const RateWrap = styled.section`
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  &::-webkit-scrollbar {
    display: block !important;
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffad9f;
    border-radius: 50px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const RateTitleWrap = styled.section`
  margin: 20px 17px 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RateTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const MoreViewBtn = styled(ButtonStyle)`
  font-size: 14px;
  font-weight: 500;
  width: 75px;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    background-color: #ff644b;
    color: #fff;
  }
`;

const PlaceList = styled.ul`
  margin: 0 20px 16px;
  display: flex;
  gap: 8px;
  & :last-child {
    margin-right: 8px;
  }
`;

const NoListDiv = styled.div`
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  color: #767676;
  margin: 20px 0 20px;
`;

export {
  RateWrap,
  RateTitleWrap,
  RateTitle,
  MoreViewBtn,
  PlaceList,
  NoListDiv,
};
