import './Album.css';
import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

function Album({ album }: { album: AlbumType }) {
  const { /* artistId, */ artistName, collectionId, collectionName,
    /* collectionPrice, */ artworkUrl100/* , releaseDate, trackCount */ } = album;

  return (
    <div className="album-card">
      <img src={ artworkUrl100 } alt={ `Arte do álbum ${collectionName}` } />
      <Link
        className="collection-name"
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
        state={ { collectionId } }
      >
        {collectionName}
      </Link>
      <Link
        className="artist-name"
        to={ `/${artistName}` }
      >
        <span>{artistName}</span>
      </Link>
    </div>
  );
}

export default Album;
