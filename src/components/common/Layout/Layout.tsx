import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import BackgroundImg from '../../../img/background-img.svg';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const location = useLocation();

  const pathsWithNavBar = [
    '/main',
    '/search',
    '/playlist/create',
    '/playlist/summary',
    '/user/profile',
    '/randomplay',
  ];

  const isNavBarShowed = pathsWithNavBar.some((path) =>
    location.pathname.includes(path),
  );

  return (
    <LayoutWrap>
      <Header />
      {children}
      {isNavBarShowed && <NavBar />}
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div`
  width: 100%;
  height: 100%;
`;
