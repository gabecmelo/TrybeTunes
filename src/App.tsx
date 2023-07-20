import { Route, Routes } from 'react-router-dom';
import Login from './pages/home';
import Search from './pages/Search';
import NotFound from './pages/Not Found';
import Musics from './pages/Musics';
import Layout from './pages/Layout';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Musics /> } />
        <Route path="favorites" element={ <Favorites /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
