import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './navigation.styles.css';

const Navigation = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    const showNavBar = window.scrollY > 100;
    setShow(showNavBar);
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <div className={`nav ${!!show && 'nav__black'}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/320px-Logonetflix.png"
          alt="netflix_logo"
          onClick={()=> navigate('/')}
        />
        <img
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
          onClick={()=> navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default Navigation;
