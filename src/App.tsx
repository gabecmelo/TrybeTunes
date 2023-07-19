import { Route, Routes } from 'react-router-dom';
import Login from './pages/home';
import Search from './pages/Search';
import NotFound from './pages/Not Found';
import Musics from './pages/Musics';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <Musics /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
