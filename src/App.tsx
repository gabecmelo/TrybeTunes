import { Route, Routes } from 'react-router-dom';
import Login from './pages/home';
import Search from './pages/Search';
import NotFound from './pages/Not Found';
import AlbumMusics from './pages/Album Musics';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <AlbumMusics /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
