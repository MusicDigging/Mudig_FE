import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../../../img/home_icon.svg';
import PlaylistIcon from '../../../img/playlist_icon.svg';
import MovieIcon from '../../../img/movie_icon.svg';
import ProfileIcon from '../../../img//profile_icon.svg';

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <NavBarWrap>
      <ul>
        <li>
          <StyledLink to='/main' $active={isActive('/main')}>
            <img src={HomeIcon} alt='홈 버튼' />
            <p>메인</p>
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to='/playlist/create1'
            $active={isActive('/playlist/create1')}
          >
            <img src={PlaylistIcon} alt='플리 생성 버튼' />
            <p>플리 생성</p>
          </StyledLink>
        </li>
        <li>
          <StyledLink to='/randomplay' $active={isActive('/randomplay')}>
            <img src={MovieIcon} alt='랜덤 뮤비 버튼' />
            <p>뮤비</p>
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to='/user/profile/my'
            $active={isActive('/user/profile/my')}
          >
            <img src={ProfileIcon} alt='프로필 버튼' />
            <p>마이페이지</p>
          </StyledLink>
        </li>
      </ul>
    </NavBarWrap>
  );
}

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

    p {
      font-size: 12px;
      display: block;
      text-align: center;
    }
  }
`;
interface Props {
  $active: boolean;
}

const StyledLink = styled(Link)<Props>`
  display: block;
  text-decoration: none;

  img {
    width: 24px;
    height: 24px;
    margin: 24px auto 0 auto;
    display: block;
    object-fit: cover;
    object-position: 0; /* 기본값 */
  }

  p {
    font-size: 12px;
    display: block;
    text-align: center;
    color: black; /* 기본 텍스트 색상 */
  }

  ${({ $active }) =>
    $active &&
    css`
      img {
        object-position: -24px center; /* 활성 상태일 때 변경 */
      }
      p {
        color: #7d4fff; /* 활성 상태일 때 텍스트 색상 변경 */
      }
    `}
`;
