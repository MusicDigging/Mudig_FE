import { useState } from 'react';
import styled from 'styled-components';
import TestImg from '../../img/playlist-test-img.svg';
import MoreIcon from '../../img/more-icon.svg';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import { CircleImage } from '../../components/common/Image/Image';
export default function SearchResultByType() {
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    user: false,
  });
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
    <>
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
      <SearchListBox>
        <SearchListSection>
          <SearchListTitleBox>
            <h2>플리 검색결과</h2>
            <button onClick={handleNavPlaylist}>
              <ArrowIcon fill='black' />
            </button>
          </SearchListTitleBox>
          <PlayList>
            <PlayListItem
              img={TestImg}
              title='몽환적인 밤도시 감성 R&B'
              info='Mudig Pick'
            >
              <button>
                <img src={MoreIcon} alt='더보기버튼' />
              </button>
            </PlayListItem>
            <PlayListItem
              img={TestImg}
              title='몽환적인 밤도시 감성 R&B'
              info='Mudig Pick'
            >
              <button>
                <img src={MoreIcon} alt='더보기버튼' />
              </button>
            </PlayListItem>
            <PlayListItem
              img={TestImg}
              title='몽환적인 밤도시 감성 R&B'
              info='Mudig Pick'
            >
              <button>
                <img src={MoreIcon} alt='더보기버튼' />
              </button>
            </PlayListItem>
          </PlayList>
        </SearchListSection>
        <SearchListSection>
          <SearchListTitleBox>
            <h2>유저 검색결과</h2>
            <button onClick={handleNavUser}>
              <ArrowIcon fill='black' />
            </button>
          </SearchListTitleBox>
          <UserList>
            <UserItem>
              <div>
                <CircleImage src={TestImg} alt='유저이미지' />
              </div>
              <UserInfoBox>
                <div>mumu__00</div>
                <p>뮤뮤 · 팔로잉</p>
              </UserInfoBox>
            </UserItem>
            <UserItem>
              <div>
                <CircleImage src={TestImg} alt='유저이미지' />
              </div>
              <UserInfoBox>
                <div>mumu__00</div>
                <p>뮤뮤 · 팔로잉</p>
              </UserInfoBox>
            </UserItem>
            <UserItem>
              <div>
                <CircleImage src={TestImg} alt='유저이미지' />
              </div>
              <UserInfoBox>
                <div>mumu__00</div>
                <p>뮤뮤 · 팔로잉</p>
              </UserInfoBox>
            </UserItem>
          </UserList>
        </SearchListSection>
      </SearchListBox>
    </>
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
const SearchListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const SearchListSection = styled.section`
  h2 {
    font-size: 20px;
  }
`;
const SearchListTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0;
  margin-bottom: 20px;
`;
const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const UserItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;
const UserInfoBox = styled.div`
  font-size: var(--font-md);
  div {
    margin-bottom: 3px;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  p {
    color: var(--sub-font-color);
  }
`;
