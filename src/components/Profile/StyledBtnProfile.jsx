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
`;

const CircleBtn = styled.button`
  ${ComFlex};
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  background-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
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
`;

export {
  FollowBtn,
  CircleBtn,
  ProfileBtnSection,
  CircleBtnWrap,
  MyBtnSection,
  MyBtn,
};
