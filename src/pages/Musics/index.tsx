import './Musics.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../../components/MusicCard';

function Musics() {
  const location = useLocation();
  const { collectionId } = location.state ?? {};
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [musics, setMusics] = useState<SongType[]>();
  const [album, setAlbum] = useState<AlbumType>();
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="musics-content">
      <h3 className='voltar' onClick={ handleBack }>Voltar</h3>
      <div className="album-container">
        <img src={ album?.artworkUrl100 } alt={ `Album ${album?.collectionName}` } />
        <h1 data-testid="album-name">{album?.collectionName}</h1>
        <p data-testid="artist-name">{album?.artistName}</p>
      </div>

      <main className="musics-container">
        {
          musics && musics.map((music) => {
            return <MusicCard key={ music.trackId } music={ music } />;
          })
        }
      </main>
    </div>
  );
}

export default Musics;
