import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Essa página não existe</h1>
      <Link to="/TrybeTunes/">Voltar ao início</Link>
    </>
  );
}

export default NotFound;
