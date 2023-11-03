import styled, { keyframes } from 'styled-components';

const AppearAnimation = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const Appear = styled.div`
  animation: ${AppearAnimation} 1s ease;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const BowlAnimation = keyframes`
0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-30px);}
  60% {transform: translateY(-15px);}
`;

const LogoBowl = styled.img`
  animation: ${BowlAnimation} 2s ease;

  display: block;
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
`;

const NameAnimation = keyframes`
0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const LogoName = styled.img`
  animation: ${NameAnimation} 2s ease;
  margin-left: 6px;
  display: block;
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
`;

export { Appear, LogoBowl, LogoName };
