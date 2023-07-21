import './EditProfile.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../Loading';
import { UserType } from '../../types';

function EditProfileComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>();
  const [profileInfo, setProfileInfo] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [isValidCamps, setIsValidCamps] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfos = async () => {
      const userInfo = await getUser();
      setIsLoading(false);
      setUser(userInfo);
      setProfileInfo(userInfo);
    };
    getUserInfos();
  }, []);

  const verifyCamps = () => {
    if (profileInfo) {
      const { name, email, image, description } = profileInfo;
      const validName = name.length >= 3;
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      // const validImage = /^(http|https):\/\/[^ "]+$/.test(image);
      const validImage = image.length > 0;
      const validDescription = description.trim().length > 0;
      setIsValidCamps(validName && validEmail && validImage && validDescription);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<
  HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
    verifyCamps();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await updateUser(profileInfo);
    setIsLoading(false);
    navigate('/profile');
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <form className="edit-profile-form" onSubmit={ handleSubmit }>
      <Link to="/profile/edit">Editar perfil</Link>
      <fieldset>
        <img
          data-testid="profile-image"
          src={ user?.image || 'https://www.gov.br/cdn/sso-status-bar/src/image/user.png' }
          alt="Profile"
        />
        <input
          className="edit-profile-input"
          onChange={ handleChange }
          data-testid="edit-input-image"
          type="text"
          name="image"
          id="img"
          placeholder="insira um link"
          value={ profileInfo?.image }
        />
      </fieldset>

      <label htmlFor="name">
        <h2>Nome</h2>
        <p>Fique à vontade para usar seu nome social</p>
        <input
          className="edit-profile-input"
          onChange={ handleChange }
          data-testid="edit-input-name"
          type="text"
          name="name"
          id="name"
          placeholder="Digite o seu nome"
          value={ profileInfo?.name }
        />
      </label>

      <label htmlFor="email">
        <h2>E-mail</h2>
        <p>Escolha um e-mail que consulte diariamente</p>
        <input
          className="edit-profile-input"
          onChange={ handleChange }
          data-testid="edit-input-email"
          type="text"
          name="email"
          id="email"
          placeholder="seu_nome@email.com.br"
          value={ profileInfo?.email }
        />
      </label>

      <label htmlFor="description">
        <h2>Descrição</h2>
        <textarea
          className="edit-profile-textarea"
          onChange={ handleChange }
          data-testid="edit-input-description"
          name="description"
          placeholder="Até 150 caracteres"
          id="textarea"
          value={ profileInfo?.description }
          maxLength={ 150 }
        />
      </label>
      <button
        className="edit-profile-button"
        data-testid="edit-button-save"
        disabled={ !isValidCamps }
      >
        SALVAR
      </button>
    </form>
  );
}

export default EditProfileComponent;
