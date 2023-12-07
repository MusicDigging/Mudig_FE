import React from 'react';
import styled from 'styled-components';

export default function SearchNav({ currentNav, setCurrentNav }) {
  const handleNavAll = () => {
    setCurrentNav({ all: true, playlist: false, user: false });
  };
  const handleNavPlaylist = () => {
    setCurrentNav({ all: false, playlist: true, user: false });
  };
  const handleNavUser = () => {
    setCurrentNav({ all: false, playlist: false, user: true });
  };
  return (
    <nav>
      <NavList>
        <li>
          <button
            onClick={handleNavAll}
            className={currentNav.all ? 'active' : ''}
          >
            전체
          </button>
        </li>
        <li>
          <button
            onClick={handleNavPlaylist}
            className={currentNav.playlist ? 'active' : ''}
          >
            플리
          </button>
        </li>
        <li>
          <button
            onClick={handleNavUser}
            className={currentNav.user ? 'active' : ''}
          >
            유저
          </button>
        </li>
      </NavList>
    </nav>
  );
}
const NavList = styled.ul`
  display: flex;
  margin-bottom: 24px;
  li {
    width: 100%;
  }
  button {
    font-size: var(--font-lg);
    width: 100%;
    height: 44px;
    padding: 10px;
    &:active,
    &.active {
      color: var(--btn-point-color);
      box-shadow: inset 0 -2px var(--btn-point-color);
    }
  }
`;
