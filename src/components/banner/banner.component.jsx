import './banner.styles.css';

const Banner = () => {
  const truncateText = (text = '', lettersCount) => {
    return (text || '').toString().length > lettersCount
      ? text.substring(0, lettersCount - 1).concat('...')
      : text;
  };

  return (
    <header
      className="banner"
      style={{
        // backgroundImage: `url('https://sitehosting.com.br/wp-content/uploads//2013/09/netflix-logo1.png?_gl=1*spyzvy*_gcl_au*MjAzODkzNTMyOC4xNjg5NzA2OTkw')`,
        backgroundColor: '#000000',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncateText(
            `
        This is a test description This is a test description
        This is a test description This is a test description
        This is a test description This is a test description
        This is a test description This is a test description
        This is a test description This is a test description
        This is a test description This is a test description
        This is a test description This is a test description
        This is a test description This is a test description
        `,
            150
          )}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
