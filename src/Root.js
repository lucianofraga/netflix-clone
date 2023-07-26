import React, { useEffect } from 'react';
import './Root.css';
import { Home } from './routes/home/home.component';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Login from './routes/login/login.component';
import { auth } from './firebase';

const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/test', Component: Test },
  { path: '*', Component: Root },
]);

export default function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log('logged user', userAuth.displayName || userAuth.email, userAuth);
      } else {
        console.log('no user logged in');
      }
    });

    return unsubscribe;
  }, []);

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

function Test() {
  return (
    <div>
      <h1>Test component</h1>
    </div>
  );
}
