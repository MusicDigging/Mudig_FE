import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

export default function Layout({ children }) {
  const location = useLocation();

  const pathsWithoutNavBar = [
    '/main',
    '/search',
    '/playlist',
    '/user/profile',
    '/randomplay',
  ];

  const isNavBarHidden = pathsWithoutNavBar.includes(location.pathname);

  return (
    <>
      <Header />
      {isNavBarHidden && <NavBar />}
      {children}
    </>
  );
}
