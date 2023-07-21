import './MusicCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

type MusicCardProps = {
  music: SongType
  favoriteMusics: SongType[] | undefined
};

function MusicCard({ music, favoriteMusics }: MusicCardProps) {
  const { trackId, trackName, previewUrl } = music;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const isFavorite = favoriteMusics?.some((favoriteMusic) => favoriteMusic
      .trackId === trackId);
    setIsChecked(!!isFavorite);
  }, [favoriteMusics, trackId]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(target.checked);
    if (target.checked) {
      addSong(music);
    } else {
      removeSong(music);
    }
  };

  const location = useLocation();
  if (location.pathname === '/favorites') {
    return (
      <div>
        {
          isChecked ? (
            <div className="music-card">
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                className="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                htmlFor={ String(trackId) }
              >
                {
                  isChecked ? (
                    <img src="/src/images/checked_heart.png" alt="favorite" />
                  ) : (
                    <img src="/src/images/empty_heart.png" alt="favorite" />
                  )
                }
                <input
                  className="checkbox"
                  onChange={ handleChange }
                  type="checkbox"
                  id={ String(trackId) }
                  checked={ isChecked }
                />
              </label>

            </div>
          ) : (
            <div />
          )
      }
      </div>
    );
  }

  return (
    <div className="music-card">
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        className="favorite"
        data-testid={ `checkbox-music-${trackId}` }
        htmlFor={ String(trackId) }
      >
        {
          isChecked ? (
            <img src="/src/images/checked_heart.png" alt="favorite" />
          ) : (
            <img src="/src/images/empty_heart.png" alt="favorite" />
          )
        }
        <input
          className="checkbox"
          onChange={ handleChange }
          type="checkbox"
          id={ String(trackId) }
          checked={ isChecked }
        />
      </label>

    </div>
  );
}

export default MusicCard;
