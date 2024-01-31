import React from 'react';
import styled, { css } from 'styled-components';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import HomeIcon from '../../../img/home_icon.svg';
import PlaylistIcon from '../../../img/playlist_icon.svg';
import MovieIcon from '../../../img/movie_icon.svg';
import ProfileIcon from '../../../img//profile_icon.svg';
import TopButton from '../Button/TopButton';

function NavBar(): JSX.Element {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <NavBarWrap>
      <TopButton />
      <ul>
        <StyledLink to='/main' $active={isActive('/main')}>
          <li>
            <img src={HomeIcon} alt='홈 버튼'></img>
            <p>메인</p>
          </li>
        </StyledLink>
        <StyledLink
          to='/playlist/create1'
          $active={isActive('/playlist/create1')}
        >
          <li>
            <img src={PlaylistIcon} alt='플리 생성 버튼'></img>
            <p>플리 생성</p>
          </li>
        </StyledLink>
        <StyledLink to='/randomplay' $active={isActive('/randomplay')}>
          <li>
            <img src={MovieIcon} alt='랜덤 뮤비 버튼'></img>
            <p>뮤비</p>
          </li>
        </StyledLink>
        <StyledLink
          to='/user/profile/my'
          $active={isActive('/user/profile/my')}
        >
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

const NavBarWrap = styled.nav`
  border-top: 1px solid var(--border-color);
  position: fixed;
  bottom: 0;
  border-radius: 12px 12px 0 0;
  background: var(--white, #fff);
  box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.05);
  width: 100%; /* 반응형을 위해 100%로 설정 */
  max-width: 430px; /* 최대 430px */
  min-width: 360px; /* 최소 360px */
  z-index: 15;
  ul {
    margin: 0 auto; /* 중앙 정렬 */
    padding: 0;
    display: flex;
    justify-content: space-around;
    width: 100%; /* 부모 컨테이너에 맞춰서 100% */

    li {
      min-width: 90px;
      height: 88px;
      list-style: none;
      overflow: hidden;
    }

    img {
      width: 24px;
      height: 24px;
      margin: 24px auto 0 auto;
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
interface Props {
  $active: boolean;
}

const StyledLink = styled(Link)<Props>`
  ${({ $active }) =>
    $active &&
    css`
      li img {
        object-position: -24px center;
      }
      p {
        color: #7d4fff;
      }
    `}
`;
