import { useState } from 'react';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading';

type HtmlElementType = React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement>;

function Login() {
  const [loginInfo, setLoginInfo] = useState<any>();
  const [disableButton, setDisableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const getUser = async () => {
      setIsLoading(true);
      await createUser(loginInfo);
      setIsLoading(false);
    };
    getUser();
  };

  const handleChange = ({ target }: HtmlElementType) => {
    const { value } = target;
    if (value.length >= 3) {
      setDisableButton(false);
      setLoginInfo({ name: target.value });
    } else {
      setDisableButton(true);
    }
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        onChange={ handleChange }
        data-testid="login-name-input"
        type="text"
        name="login-input"
        placeholder="Qual é o seu nome?"
      />
      <button data-testid="login-submit-button" disabled={ disableButton }>Entrar</button>
    </form>
  );
}

export default Login;
