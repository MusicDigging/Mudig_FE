import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

export default function Layout({ children }) {
  const location = useLocation();

  const pathsWithoutNavBar = [
    '/main',
    '/search',
    '/playlist/create',
    '/playlist/summary',
    '/user/profile',
    '/randomplay',
  ];

  const isNavBarShowed = pathsWithoutNavBar.some((path) =>
    location.pathname.includes(path),
  );

  return (
    <>
      <Header />
      {isNavBarShowed && <NavBar />}
      {children}
    </>
  );
}
