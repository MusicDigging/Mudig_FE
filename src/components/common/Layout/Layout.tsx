import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import BackgroundImg from '../../../img/background-img.svg';
import Toast from '../Toast';
import { useRecoilState } from 'recoil';
import { toastAtom } from '../../../library/atom';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const location = useLocation();
  const [toast, setToast] = useRecoilState(toastAtom);
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
    <>
      {/* <LayoutWrap> */}
      <Header />
      {toast && (
        <Toast setToast={setToast} text={toast.content} type={toast.type} />
      )}
      {children}
      {isNavBarShowed && <NavBar />}
      {/* </LayoutWrap> */}
    </>
  );
}

const LayoutWrap = styled.div`
  /* width: 100%;
  height: 100%; */
`;
