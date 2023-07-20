import './Search.css';
import { useState } from 'react';
import { AlbumType, HtmlElementType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Album from '../Album';

const INITIAL_INPUT_VALUE = {
  artistName: '',
};

type InputType = {
  artistName: string
};

function SearchComponent() {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<InputType>(INITIAL_INPUT_VALUE);
  const [artistName, setArtistName] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumType[] | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const getAlbums = async () => {
      SetIsLoading(true);
      setSearch(artistName);
      const searchedAlbums = await searchAlbumsAPI(artistName);
      setAlbums(searchedAlbums);
      SetIsLoading(false);
    };
    getAlbums();
    setInputValue(INITIAL_INPUT_VALUE);
    setDisabledButton(true);
    setArtistName('');
  };

  const handleChange = ({ target }: HtmlElementType) => {
    const { name, value } = target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (value.length >= 2) {
      setDisabledButton(false);
      setArtistName(value);
    } else {
      setDisabledButton(true);
    }
  };

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <div className="page">
      <form onSubmit={ handleSubmit }>
        <input
          onChange={ handleChange }
          data-testid="search-artist-input"
          className="artist-input"
          type="text"
          name="artistName"
          value={ inputValue.artistName }
          placeholder="Nome do artista"
        />
        <button
          data-testid="search-artist-button"
          disabled={ disabledButton }
        >
          Procurar
        </button>
      </form>
      {albums && (
        <div>
          {albums.length > 0 ? (
            <>
              <h1>
                Resultado de álbuns de:
                {` ${search}`}
              </h1>
              <main>
                {albums.map((album) => {
                  return <Album key={ album.collectionId } album={ album } />;
                })}
              </main>
            </>
          ) : (
            <h1>Nenhum álbum foi encontrado</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
