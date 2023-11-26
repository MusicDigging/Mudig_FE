import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../../../img/icon_home.svg';
import PlaylistIcon from '../../../img/icon_playlist.svg';
import MovieIcon from '../../../img/icon_movie.svg';
import ProfileIcon from '../../../img/icon_my_page.svg';

function NavBar() {
  return (
    <NavBarWrap>
      {/* <ul>
        <Link to=''>
          <li>
            <img src={HomeIcon} alt='홈 버튼'></img>
          </li>
        </Link>
        <Link to=''>
          <li>
            <img src={PlaylistIcon} alt='플리 생성 버튼'></img>
          </li>
        </Link>
        <Link to=''>
          <li>
            <img src={MovieIcon} alt='랜덤 뮤비 버튼'></img>
          </li>
        </Link>
        <Link to=''>
          <li>
            <img src={ProfileIcon} alt='프로필 버튼'></img>
          </li>
        </Link>
      </ul> */}
      <ul>
        <li>
          <img src={HomeIcon} alt='홈 버튼'></img>
        </li>
        <li>
          <img src={PlaylistIcon} alt='플리 생성 버튼'></img>
        </li>
        <li>
          <img src={MovieIcon} alt='랜덤 뮤비 버튼'></img>
        </li>
        <li>
          <img src={ProfileIcon} alt='프로필 버튼'></img>
        </li>
      </ul>
    </NavBarWrap>
  );
}
export default NavBar;

const NavBarWrap = styled.footer`
  border-top: 1px solid var(--border-color);
  background-color: #fff;
  position: fixed;
  bottom: 0;

  ul {
    width: 360px;
    display: flex;
    justify-content: space-around;

    li {
      width: 90px;
      height: 88px;
      list-style: none;
      overflow: hidden;
    }
    img {
      height: 100%;
      object-fit: cover;
      object-position: ${(props) => (props.active === 'true' ? '-90px' : '0')};
    }
    img:hover {
      object-position: -90px;
    }
  }
`;
