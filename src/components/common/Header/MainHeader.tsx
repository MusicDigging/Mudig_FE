import styled from 'styled-components';
import Logo from '../../../img/logo.svg';
import SearchIcon from '../../../img/search-icon.svg';
import BgImg from '../../../img/background-img2.svg';
import { Link } from 'react-router-dom';

export default function MainHeader() {
  return (
    <MainHeaderWrap>
      <Link to={'/main'}>
        <img src={Logo} alt='로고'></img>
      </Link>
      <Link to={'/search'}>
        <Search />
      </Link>
    </MainHeaderWrap>
  );
}
const MainHeaderWrap = styled.header`
  position: fixed;
  z-index: 999;
  width: 100%;
  max-width: 430px;
  height: 70px;
  padding: 23px 16px;
  display: flex;
  justify-content: space-between;
  background: url(${BgImg}) top left / cover no-repeat;
`;
const Search = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${SearchIcon});
`;
