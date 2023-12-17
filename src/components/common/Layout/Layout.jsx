import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

export default function Layout({ children }) {
  const location = useLocation();

  const pathsWithNavBar = [
    '/main',
    '/search',
    '/playlist/create',
    '/playlist/summary',
    '/user/profile',
    '/randomplay',
    '/playlist/create',
  ];

  const isNavBarShowed = pathsWithNavBar.some((path) =>
    location.pathname.includes(path),
  );

  return (
    <>
      <Header />
      {children}
      {isNavBarShowed && <NavBar />}
    </>
  );
}
