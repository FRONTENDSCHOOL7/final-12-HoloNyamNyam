import styled, { css } from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';

const ComFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBtnSection = styled.section`
  ${ComFlex};
  padding-bottom: 28px;
  border-bottom: 1px solid #dbdbdb;
  /* margin: 16px 0 24px; */
  gap: 139px;
`;

const FollowBtn = styled(ButtonStyle)`
  font-size: 14px;
  font-weight: 500;

  transition: filter 0.2s ease;
  &:hover {
    filter: brightness(0.8);
  }
`;

const CircleBtn = styled.button`
  ${ComFlex};
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  background-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #fff;
  }
`;

const CircleBtnWrap = styled.section`
  ${ComFlex};
  gap: 14px;
`;

const MyBtnSection = styled.section`
  ${ComFlex};
  padding-bottom: 28px;
  border-bottom: 1px solid #dbdbdb;
  /* margin: 16px 0 24px; */
  gap: 17px;
`;

const MyBtn = styled(ButtonStyle)`
  font-size: 14px;
  font-weight: 500;
  width: 159px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    background-color: #ff644b;
    color: #fff;
  }
`;

export {
  FollowBtn,
  CircleBtn,
  ProfileBtnSection,
  CircleBtnWrap,
  MyBtnSection,
  MyBtn,
};
