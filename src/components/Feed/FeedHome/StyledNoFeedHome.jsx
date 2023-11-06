import styled from 'styled-components';

const HomeWrapper = styled.section`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
`;
const HomeImg = styled.img`
  aspect-ratio: auto;
  margin: -70px 0 12px 0;
`;
const HomeText = styled.h2`
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
`;

export { HomeWrapper, HomeImg, HomeText };
