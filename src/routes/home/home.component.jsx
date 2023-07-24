import React from 'react';
import './home.styles.css';
import Navigation from '../../components/navigation/navigation.component';
import Banner from '../../components/banner/banner.component';
import REQUESTS from '../../utils/requests';
import Row from '../../components/row/row.component';

export const Home = () => {
  return (
    <div className="homeScreen">
      <Navigation />
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={REQUESTS.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={REQUESTS.fetchTrending} />
      <Row title="Top Rated" fetchUrl={REQUESTS.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={REQUESTS.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={REQUESTS.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={REQUESTS.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={REQUESTS.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={REQUESTS.fetchDocumentaries} />
    </div>
  );
};
