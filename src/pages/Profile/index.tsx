import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { UserType } from '../../types';

function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const getUserInfos = async () => {
      const userInfo = await getUser();
      setIsLoading(false);
      setUser(userInfo);
    };
    getUserInfos();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <main>
      <img
        data-testid="profile-image"
        src={ user?.image || 'https://www.gov.br/cdn/sso-status-bar/src/image/user.png' }
        alt="Profile"
      />
      <Link to="/profile/edit">Editar perfil</Link>
      <h2>Nome</h2>
      <span>{user?.name}</span>
      <h2>E-mail</h2>
      <span>{user?.email}</span>
      <h2>Descrição</h2>
      <span>{user?.description}</span>
    </main>
  );
}

export default Profile;
