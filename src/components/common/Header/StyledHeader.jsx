import styled from 'styled-components';
import { ButtonStyle } from '../Button/Button';

const HeaderWrap = styled.header`
  position: fixed;
  z-index: 999;
  width: 100%;
  max-width: 390px;
  top: 0%;
`;

const HeaderLayoutSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0px 16px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  background-color: white;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const HeaderLeftBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 10px 10px 10px 0;
  transition: transform 0.2s ease;
  transform: scale(1);
  cursor: default;
`;

const HeaderRightBtn = styled.button`
  border: 0;
  background-color: transparent;
  &:hover {
    transform: scale(1.2) rotate(270deg);
  }
  transition: transform 0.2s ease;
  transform: scale(1) rotate(0deg);
`;

const HeaderSearchInp = styled.input`
  width: 316px;
  background-color: #f2f2f2;
  border: 0;
  border-radius: 32px;
  padding: 7px 16px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #c4c4c4;
  }
`;

const HeaderSpan = styled.span`
  display: flex;
  align-items: center;
`;

const HeaderTextP = styled.p`
  text-overflow: ellipsis;
  width: 180px;
  white-space: nowrap;
  display: inline-block;
  font-size: 14px;
  line-height: 160%;
  overflow: hidden;
  font-weight: 600;
`;

const SocialSvg = styled.div`
  height: 24px;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.2) translateX(-10%);
    cursor: pointer;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const SortButton = styled(ButtonStyle)`
  width: 140px;
  height: 34px;
  border: 1px solid var(--DBDBDB, #dbdbdb);
  margin: 15px 0 15px auto;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    background-color: #ff644b;
    color: #fff;
  }
`;

const Star = styled.img`
  width: 14px;
  height: 14px;
`;

export {
  HeaderWrap,
  HeaderLayoutSection,
  HeaderTitle,
  HeaderLeftBtn,
  HeaderRightBtn,
  HeaderSearchInp,
  HeaderSpan,
  HeaderTextP,
  SocialSvg,
  ButtonWrap,
  SortButton,
  Star,
};
