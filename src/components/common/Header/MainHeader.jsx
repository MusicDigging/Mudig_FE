import React from 'react';
import styled from 'styled-components';
import Logo from '../../../img/logo.svg';
import SearchIcon from '../../../img/icon_search.svg';

function MainHeader() {
  return (
    <MainHeaderWrap>
      {/* <link>
        <img src='' art=''></img>
      </link> */}
      <img src={Logo} alt='로고'></img>
      <Search></Search>
    </MainHeaderWrap>
  );
}
export default MainHeader;
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
