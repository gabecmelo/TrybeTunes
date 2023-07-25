import { NavLink } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

function Header() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const setUser = async () => {
      const user = await getUser();
      const { name } = user;
      setUsername(name);
      setIsLoading(false);
    };
    setUser();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <header data-testid="header-component">
      <NavLink to="/TrybeTunes/"><h1>TrybeTunes</h1></NavLink>
      <nav>
        <NavLink data-testid="link-to-search" to="/TrybeTunes/search">Pesquisar</NavLink>
        <NavLink data-testid="link-to-favorites" to="/TrybeTunes/favorites">Favoritas</NavLink>
        <NavLink data-testid="link-to-profile" to="/TrybeTunes/profile">Perfil</NavLink>
      </nav>
      <span data-testid="header-user-name">{username}</span>
    </header>
  );
}

export default Header;
