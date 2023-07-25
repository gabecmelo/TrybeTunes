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
      <Route path="/TrybeTunes" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/TrybeTunes/search" element={ <Search /> } />
        <Route path="/TrybeTunes/album/:id" element={ <Musics /> } />
        <Route path="/TrybeTunes/favorites" element={ <Favorites /> } />
        <Route path="/TrybeTunes/profile" element={ <Profile /> } />
        <Route path="/TrybeTunes/profile/edit" element={ <EditProfile /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
