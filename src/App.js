import { GlobalStyle } from './components/style/GlobalStyle';
import Home from './pages/Home/Home';
import Nav from './components/common/Nav/Nav';

function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
      <Nav />
    </>
  );
}

export default App;
