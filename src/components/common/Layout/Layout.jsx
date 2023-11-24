import React from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <NavBar />
    </>
  );
}
