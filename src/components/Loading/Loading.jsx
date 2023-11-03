import React from 'react';
import styled, { keyframes } from 'styled-components';

const Flexbox = styled.div`
  > div {
    width: 390px;
    height: 100vh;
    top: 0;
    /* left: 0; */
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    margin: 0 auto;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: white;
  }

  @media only screen and (max-width: 968px) {
    > div {
      flex: 0 0 33.3333333%;
    }
  }

  @media only screen and (max-width: 768px) {
    > div {
      flex: 0 0 50%;
    }
  }

  @media only screen and (max-width: 568px) {
    > div {
      flex: 0 0 100%;
    }
  }
`;

const opaque = keyframes`
    0%,                      
    100% {
      opacity: 0;           
      transform: scale(0.5); 
    }
    50% {
      opacity: 1;             
      transform: scale(1.2);
    }
`;

const LoadingSpan = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: gray;
  border-radius: 50%;
  animation: ${opaque} 1s 0s linear infinite;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & span:nth-child(1) {
    animation-delay: 0s;
    background-color: #ff3945;
  }

  & span:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #ff644b;
  }

  & span:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #ff9052;
  }
`;

export default function Loading() {
  return (
    <Flexbox>
      <div>
        <LoadingDiv>
          <LoadingSpan />
          <LoadingSpan />
          <LoadingSpan />
        </LoadingDiv>
      </div>
    </Flexbox>
  );
}
