import grayBowl from '../../images/logo_bowl_gray.svg';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { HomeWrapper, HomeImg, HomeText } from './StyledNoFeedHome';

export default function NoFeedHome() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/search');
  }
  return (
    <HomeWrapper>
      <HomeImg src={grayBowl} alt='로고이미지' />
      <HomeText>유저를 검색해 팔로우 해보세요!</HomeText>
      <Button
        type='button'
        content='검색하러가요'
        size='l'
        width='m'
        $bgcolor='active'
        color='#fff'
        border='null'
        onClick={handleClick}
      />
    </HomeWrapper>
  );
}
