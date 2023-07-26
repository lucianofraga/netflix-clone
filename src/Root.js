import React, { useEffect } from 'react';
import './Root.css';
import { Home } from './routes/home/home.component';
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import Login from './routes/login/login.component';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/user/userSlice';
import Profile from './routes/profile/profile.component';

const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/profile', Component: Profile },
  { path: '*', Component: Root },
]);

export default function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        console.log('no user logged in');
        dispatch(logout);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <React.Fragment>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <RouterProvider router={router} />
        </div>
      )}
    </React.Fragment>
  );
}

function Root() {
  return <Routes />;
}
