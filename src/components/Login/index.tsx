import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';
import { HtmlElementType } from '../../types';

function Login() {
  const [loginInfo, setLoginInfo] = useState<any>();
  const [disabledButton, setDisabledButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const getUser = async () => {
      setIsLoading(true);
      await createUser(loginInfo);
      setIsLoading(false);
      navigate('/search');
    };
    getUser();
  };

  const handleChange = ({ target }: HtmlElementType) => {
    const { value } = target;
    if (value.length >= 3) {
      setDisabledButton(false);
      setLoginInfo({ name: target.value });
    } else {
      setDisabledButton(true);
    }
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="login-container">
      <h1>TrybeTunes</h1>
      <form className="login-form" onSubmit={ handleSubmit }>
        <input
          onChange={ handleChange }
          data-testid="login-name-input"
          type="text"
          name="login-name"
          placeholder="Qual é o seu nome?"
        />
        <button
          data-testid="login-submit-button"
          disabled={ disabledButton }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
