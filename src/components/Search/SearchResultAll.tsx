import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircleImage } from '../common/Image/Image';
import AddPlaylist from '../../img/add-video-icon.svg';
import PlayListItem from '../common/PlayList/PlayListItem';
import EmptySearch from './EmptySearch';
import SearchResultTitle from './SearchResultTitle';
import { ISearchResult } from '../../types/search';

interface Props {
  result: ISearchResult;
  handleAddPlaylist: (arg0: number) => void;
  handleNavPlaylist: React.MouseEventHandler;
  handleNavMusic: React.MouseEventHandler;
  handleNavUser: React.MouseEventHandler;
}

export default function SearchResultAll(props: Props) {
  const {
    result,
    handleAddPlaylist,
    handleNavPlaylist,
    handleNavMusic,
    handleNavUser,
  } = props;

  return (
    <>
      <SearchListBox>
        <SearchListSection>
          <SearchResultTitle
            title='플리 검색결과'
            handleNav={handleNavPlaylist}
          />
          <ul>
            {result.recent_playlists.length !== 0 ? (
              result.recent_playlists.map((item) => {
                return (
                  <li key={item.playlist.id}>
                    <Link
                      to={`/playlist/detail/${item.playlist.id}`}
                      state={{ id: item.playlist.id }}
                    >
                      <PlayListItem
                        img={item.playlist.thumbnail}
                        title={item.playlist.title}
                        info={
                          typeof item.writer === 'string' &&
                          item.writer === '유저 정보 없음'
                            ? '알 수 없는 사용자'
                            : item.writer.name
                        }
                      />
                    </Link>
                  </li>
                );
              })
            ) : (
              <EmptySearch />
            )}
          </ul>
        </SearchListSection>
        <SearchListSection>
          <SearchResultTitle title='노래 검색결과' handleNav={handleNavMusic} />
          <ul>
            {result.search_music.length !== 0 ? (
              result.search_music[0].music.slice(0, 3).map((item) => {
                return (
                  <PlayListItem
                    key={item.id}
                    img={item.thumbnail}
                    title={item.song}
                    info={item.singer}
                  >
                    <button
                      type='button'
                      onClick={() => handleAddPlaylist(item.id)}
                    >
                      <img src={AddPlaylist} alt='플리에추가' />
                    </button>
                  </PlayListItem>
                );
              })
            ) : (
              <EmptySearch />
            )}
          </ul>
        </SearchListSection>
        <SearchListSection>
          <SearchResultTitle title='유저 검색결과' handleNav={handleNavUser} />
          <UserList>
            {result.recent_users.length !== 0 ? (
              result.recent_users.map((user) => {
                return (
                  <li key={user.id}>
                    <Link
                      to={`/user/profile/${user.id}`}
                      state={{ id: user.id }}
                    >
                      <UserItem>
                        <UserImgBox>
                          <CircleImage src={user.image} alt='유저이미지' />
                        </UserImgBox>
                        <UserInfoBox>
                          <div>{user.name}</div>
                          <p>{user.about}</p>
                        </UserInfoBox>
                      </UserItem>
                    </Link>
                  </li>
                );
              })
            ) : (
              <EmptySearch />
            )}
          </UserList>
        </SearchListSection>
      </SearchListBox>
    </>
  );
}
const SearchListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const SearchListSection = styled.section``;
const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const UserItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;
const UserImgBox = styled.div`
  width: 60px;
  height: 60px;
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
