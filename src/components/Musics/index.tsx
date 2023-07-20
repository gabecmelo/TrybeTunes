import './Musics.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Loading from '../Loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

function MusicsComponent() {
  const location = useLocation();
  const { collectionId } = location.state ?? {};
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [musics, setMusics] = useState<SongType[]>();
  const [album, setAlbum] = useState<AlbumType>();
  const [favoriteMusics, setFavoriteMusics] = useState<SongType[]>();

  useEffect(() => {
    const getFavoriteMusics = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setFavoriteMusics(favoriteSongs);
    };
    getFavoriteMusics();
  }, []);

  useEffect(() => {
    const findMusics = async () => {
      const musicsData = await getMusics(String(collectionId));
      const slicedMusicsData = musicsData.slice(1);
      setAlbum(musicsData[0] as AlbumType);
      setMusics(slicedMusicsData as SongType[]);
      setIsLoading(false);
    };
    findMusics();
  }, [collectionId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="musics-content">
      <div className="album-container">
        <img src={ album?.artworkUrl100 } alt={ `Album ${album?.collectionName}` } />
        <h1 data-testid="album-name">{album?.collectionName}</h1>
        <p data-testid="artist-name">{album?.artistName}</p>
      </div>

      <main className="musics-container">
        {
          musics && musics.map((music) => {
            return (<MusicCard
              key={ music.trackId }
              favoriteMusics={ favoriteMusics }
              music={ music }
            />);
          })
        }
      </main>
    </div>
  );
}

export default MusicsComponent;
