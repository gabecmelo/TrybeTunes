import './Album.css';
import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

function Album({ album }: { album: AlbumType }) {
  const { artistName, collectionId, collectionName, artworkUrl100 } = album;

  return (
    <div className="album-card">
      <img src={ artworkUrl100 } alt={ `Arte do álbum ${collectionName}` } />
      <Link
        className="collection-name"
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/TrybeTunes/album/${collectionId}` }
        state={ { collectionId } }
      >
        {collectionName}
      </Link>
      <Link
        className="artist-name"
        to={ `/TrybeTunes/${artistName}` }
      >
        <span>{artistName}</span>
      </Link>
    </div>
  );
}

export default Album;
