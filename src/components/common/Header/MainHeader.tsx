import React from 'react';
import styled from 'styled-components';
import Logo from '../../../img/logo.svg';
import SearchIcon from '../../../img/search-icon.svg';
import { Link } from 'react-router-dom';

export default function MainHeader() {
  return (
    <MainHeaderWrap>
      <Link to={'/main'}>
        <img src={Logo} alt='로고' />
      </Link>
      <Link to={'/search'}>
        <Search aria-label='검색' />
      </Link>
    </MainHeaderWrap>
  );
}

const MainHeaderWrap = styled.header`
  height: 70px;
  padding: 23px 16px;
  display: flex;
  justify-content: space-between;
`;
const Search = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${SearchIcon});
`;
