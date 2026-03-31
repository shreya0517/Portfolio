import React, { useEffect, useState } from 'react';
import './Music.css';
import { MusicItem } from '../types';
import { getMusicItems } from '../queries/getMusicItems';

const favoriteGenres = ["Rock", "Classic Rock", "Hard Rock", "Blues", "Alternative"];

const Music: React.FC = () => {
  const [albums, setAlbums] = useState<MusicItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMusicItems() {
      try {
        const data = await getMusicItems();

        if (!isMounted) {
          return;
        }

        setAlbums(data);
        setError(null);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError('Unable to load favorite albums right now.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMusicItems();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="music-page">
      <div className="quote">
        <p>"Rock and Roll isn't a genre, it's a way of life."</p>
      </div>

      <div className="genre-section">
        <h3>Explore by Genre</h3>
        <div className="genres">
          {favoriteGenres.map((genre, index) => (
            <div key={index} className="genre-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <p>{genre}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="albums-section">
        <h3>Favorite Albums</h3>
        <div className="albums">
          {isLoading && <p>Loading favorite albums...</p>}

          {!isLoading && error && <p>{error}</p>}

          {!isLoading && !error && albums.length === 0 && (
            <p>No favorite albums available yet.</p>
          )}

          {!isLoading && !error && albums.map((album, index) => (
            <div key={album.id} className="album-card" style={{ animationDelay: `${index * 0.3}s` }}>
              <img
                src={album.image}
                alt={album.title}
                className="album-image"
                loading="lazy"
              />
              <div className="album-details">
                <h4>{album.title}</h4>
                <p>by {album.singer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music;
