import errorIcon from '../../images/error-404.svg';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ErrorWrapper, ErrorImg, ErrorText } from './StyledError';
export default function Error() {
  const navigate = useNavigate();
  return (
    <ErrorWrapper>
      <ErrorImg src={errorIcon} alt='404페이지' />
      <ErrorText>죄송해요. 뭔가 잘못 먹었나 봐요 :&#40;</ErrorText>
      <Button
        type='button'
        content='돌아갈래요'
        size='l'
        width='m'
        $bgcolor='active'
        color='#fff'
        border='null'
        onClick={() => navigate(-1)}
      />
    </ErrorWrapper>
  );
}
