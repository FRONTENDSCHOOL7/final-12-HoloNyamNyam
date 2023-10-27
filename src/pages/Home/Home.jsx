import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import FeedHome from '../../components/Feed/FeedHome/FeedHome';

export default function Home() {
  return (
    <>
      <Header type='home' />
      <FeedHome />
      <Nav />
    </>
  );
}
