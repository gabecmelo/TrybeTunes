import './MusicCard.css';
import { SongType } from '../../types';

function MusicCard({ music }: { music: SongType }) {
  const { trackName, previewUrl } = music;

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

    </div>
  );
}

export default MusicCard;
