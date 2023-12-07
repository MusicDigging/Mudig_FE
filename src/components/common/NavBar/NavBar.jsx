import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../../../img/home_icon.svg';
import PlaylistIcon from '../../../img/playlist_icon.svg';
import MovieIcon from '../../../img/movie_icon.svg';
import ProfileIcon from '../../../img//profile_icon.svg';

function NavBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <NavBarWrap>
      <ul>
        {/* 각 Link 컴포넌트에 isActive 함수를 이용해 현재 위치를 확인 */}
        <StyledLink to='/main' active={isActive('/main')}>
          <li>
            <img src={HomeIcon} alt='홈 버튼'></img>
            <p>메인</p>
          </li>
        </StyledLink>
        <StyledLink to='/playlist/create' active={isActive('/playlist/create')}>
          <li>
            <img src={PlaylistIcon} alt='플리 생성 버튼'></img>
            <p>플리 생성</p>
          </li>
        </StyledLink>
        <StyledLink to='/randomplay' active={isActive('/randomplay')}>
          <li>
            <img src={MovieIcon} alt='랜덤 뮤비 버튼'></img>
            <p>뮤비</p>
          </li>
        </StyledLink>
        <StyledLink to='/user/profile' active={isActive('/user/profile')}>
          <li>
            <img src={ProfileIcon} alt='프로필 버튼'></img>
            <p>마이페이지</p>
          </li>
        </StyledLink>
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
      width: 24px;
      height: 24px;
      margin: 29px auto 0 auto;
      display: block;
      object-fit: cover;
      object-position: 0;
    }
    p {
      font-size: 12px;
      display: block;
      text-align: center;
    }
    li:hover img {
      object-position: -24px;
    }
    li:hover p {
      color: #7d4fff;
    }
  }
`;
// isActive 속성에 따라 스타일을 변경하는 StyledLink 컴포넌트 생성
const StyledLink = styled(Link)`
  ${({ active }) =>
    active &&
    css`
      li img {
        object-position: -24px center;
      }
      p {
        color: #7d4fff;
      }
    `}
`;
