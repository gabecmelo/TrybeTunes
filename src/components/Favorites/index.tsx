import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../MusicCardFavorites';
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
    <div>
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
  );
}

export default FavoritesComponent;
