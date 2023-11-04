import styled from 'styled-components';
import sprite from '../../../images/SpriteIcon.svg';

const StyledContainer = styled.section`
  width: 100%;
  /* height: calc(100vh - 48px); */
  height: 100vh;
  padding-top: 48px;
  overflow: hidden;
  background: #fff;
`;

const TextContainer = styled.form`
  width: 100%;
  display: flex;
`;

const StyledFeed = styled.textarea`
  display: block;
  margin: 15px;
  padding: 15px;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  border: 0.5px solid #c4c4c4;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c0c0c0;
  }
`;

const SocialSVG = ({ id, color = '#FFFFFF', size = 35, previews }) => (
  <div
    style={{
      backgroundColor: '#C4C4C4',
      width: 80,
      height: 80,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} />
    </svg>
    <span style={{ color: '#FF644B' }}>
      {previews.length}
      <strong style={{ color: '#767676' }}>/3</strong>
    </span>
  </div>
);

const H3 = styled.h3`
  width: 342px;
  font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #767676;
  margin: 0 auto 15px;
`;

const ImagesWrapper = styled.div`
  padding: 0 15px;
`;

export {
  StyledContainer,
  StyledFeed,
  SocialSVG,
  H3,
  TextContainer,
  ImagesWrapper,
};
