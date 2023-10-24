import Header from '../../components/common/Header/Header';
import Nav from '../../components/common/Nav/Nav';
import NoFeedHome from '../../components/Feed/NoFeedHome';

export default function Home() {
  return (
    <>
      <Header type='home' />
      <NoFeedHome />
      <Nav />
    </>
  );
}
