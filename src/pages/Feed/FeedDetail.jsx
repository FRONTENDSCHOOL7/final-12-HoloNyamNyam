import Header from '../../components/common/Header/Header';
import FeedComment from '../../components/Feed/FeedComment/FeedComment';

export default function FeedDetail() {
  return (
    <>
      <h1 className='a11y-hidden'>게시물 상세 페이지</h1>
      <Header type='profile' />
      <FeedComment />
    </>
  );
}
