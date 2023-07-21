import { Route, Routes } from 'react-router-dom';
import Login from './pages/home';
import Search from './pages/Search';
import NotFound from './pages/Not Found';
import Musics from './pages/Musics';
import Layout from './pages/Layout';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Musics /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <EditProfile /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
