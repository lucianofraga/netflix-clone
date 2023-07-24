import React from 'react';
import './Root.css';
import { Home } from './routes/home/home.component';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/test', Component: Test },
  { path: '*', Component: Root },
]);

export default function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

function Root() {
  return <Routes></Routes>;
}

function Test() {
  return (
    <div>
      <h1>Test component</h1>
    </div>
  );
}
