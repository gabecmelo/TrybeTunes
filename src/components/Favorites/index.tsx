import './Favorites.css';
import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../MusicCard';
import Loading from '../Loading';

function FavoritesComponent() {
  const [favoriteMusics, setFavoriteMusics] = useState<SongType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFavoriteMusics = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setFavoriteMusics(favoriteSongs);
      setIsLoading(false);
    };
    getFavoriteMusics();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="musics-content">
      <div className="musics-container">
        {
          favoriteMusics?.map((music) => {
            return (<MusicCard
              music={ music }
              key={ music.trackId }
              favoriteMusics={ favoriteMusics }
            />);
          })
        }
      </div>
    </div>
  );
}

export default FavoritesComponent;
