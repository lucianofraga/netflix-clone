import { useState, useEffect } from 'react';
import './banner.styles.css';
import axiosInstance from '../../utils/axios';
import REQUESTS from '../../utils/requests';

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchBannerRandomMovie() {
      const request = await axiosInstance.get(REQUESTS.fetchNetflixOriginals);
      let randomPick = null;

      while (!randomPick) {
        const randomNumber = Math.floor(
          Math.random() * request.data.results.length - 1
        );
        randomPick = request.data.results[randomNumber];
      }
      setMovie(randomPick);

      return request;
    }

    fetchBannerRandomMovie();
  }, []);

  console.log('movie', movie);

  const truncateText = (text = '', lettersCount) => {
    return (text || '').toString().length > lettersCount
      ? text.substring(0, lettersCount - 1).concat('...')
      : text;
  };

  const name = movie.title || movie.name || movie.originalName;
  const description = movie.overview || '';

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncateText(`${description}`, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
