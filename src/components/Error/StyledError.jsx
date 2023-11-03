import styled from 'styled-components';
const ErrorWrapper = styled.section`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  background-color: #fff;
`;
const ErrorImg = styled.img`
  margin: -70px 0 10px 0;
  width: 103px;
`;
const ErrorText = styled.h2`
  font-weight: 400;
  font-size: 14px;
  color: #767676;
`;
export { ErrorWrapper, ErrorImg, ErrorText };
