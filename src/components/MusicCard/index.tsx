import './MusicCard.css';
import { useState } from 'react';
import { SongType } from '../../types';

function MusicCard({ music }: { music: SongType }) {
  const { trackId, trackName, previewUrl } = music;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(target.checked);
  };

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
        />
      </label>

    </div>
  );
}

export default MusicCard;
