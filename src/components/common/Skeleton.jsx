import styled, { keyframes } from 'styled-components';

const loadingImg = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(361px);
  }
`;

const SkeletonImg = styled.div`
  width: 330px;
  height: 228px;
  border-radius: 8px;
  background: #f2f2f2;
  position: relative;
  margin: 0 auto 22px;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingImg} 1.5s infinite linear;
  }
`;

const loadingProfImg = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(53px);
  }
`;

const SkeletonProfImg = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f2f2f2;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingProfImg} 1.5s infinite linear;
  }
`;

export { SkeletonImg, SkeletonProfImg };
