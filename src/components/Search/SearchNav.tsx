import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { ISearchNav } from '../../types/search';

interface Props {
  currentNav: ISearchNav;
  setCurrentNav: Dispatch<SetStateAction<ISearchNav>>;
}
export default function SearchNav({ currentNav, setCurrentNav }: Props) {
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
            플리·노래
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
    border-bottom: 2px solid transparent;
    &:active,
    &.active {
      color: var(--btn-point-color);
      border-bottom: 2px solid var(--btn-point-color);
    }
  }
`;
