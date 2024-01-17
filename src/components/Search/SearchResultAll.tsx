import styled from 'styled-components';
import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';
import { CircleImage } from '../common/Image/Image';
import EmptySearch from './EmptySearch';
import { Link } from 'react-router-dom';
import SearchResultTitle from './SearchResultTitle';
import AddPlaylist from '../../img/add-video-icon.svg';

export default function SearchResultAll(props) {
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
                  <Link
                    to={`/playlist/detail/${item.playlist.id}`}
                    key={item.playlist.id}
                    state={{ id: item.playlist.id }}
                  >
                    <PlayListItem
                      key={item.playlist.id}
                      img={item.playlist.thumbnail}
                      title={item.playlist.title}
                      info={
                        item.writer.name ||
                        (item.writer === '유저 정보 없음'
                          ? '알 수 없는 사용자'
                          : null)
                      }
                    />
                  </Link>
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
                  <Link
                    to={`/user/profile/${user.id}`}
                    key={user.id}
                    state={{ id: user.id }}
                  >
                    <UserItem key={user.id}>
                      <UserImgBox>
                        <CircleImage src={user.image} alt='유저이미지' />
                      </UserImgBox>
                      <UserInfoBox>
                        <div>{user.name}</div>
                        <p>{user.about}</p>
                      </UserInfoBox>
                    </UserItem>
                  </Link>
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
const UserItem = styled.li`
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
