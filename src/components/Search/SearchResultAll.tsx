import { Link } from 'react-router-dom';
import { CircleImage } from '../common/Image/Image';
import AddPlaylist from '../../img/add-video-icon.svg';
import PlayListItem from '../common/PlayList/PlayListItem';
import EmptySearch from './EmptySearch';
import SearchResultTitle from './SearchResultTitle';
import { ISearchResult } from '../../types/search';
import * as S from './SearchResultAllStyle';
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
    <S.SearchListBox>
      <section>
        <SearchResultTitle
          title='플리 검색결과'
          handleNav={handleNavPlaylist}
          ariaLabel='플레이리스트 검색결과 더보기'
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
      </section>
      <section>
        <SearchResultTitle
          title='노래 검색결과'
          handleNav={handleNavMusic}
          ariaLabel='노래 검색결과 더보기'
        />
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
                    <img src={AddPlaylist} alt='플레이리스트에추가' />
                  </button>
                </PlayListItem>
              );
            })
          ) : (
            <EmptySearch />
          )}
        </ul>
      </section>
      <section>
        <SearchResultTitle
          title='유저 검색결과'
          handleNav={handleNavUser}
          ariaLabel='유저 검색결과 더보기'
        />
        <S.UserList>
          {result.recent_users.length !== 0 ? (
            result.recent_users.map((user) => {
              return (
                <li key={user.id}>
                  <Link to={`/user/profile/${user.id}`} state={{ id: user.id }}>
                    <S.UserItem>
                      <S.UserImgBox>
                        <CircleImage src={user.image} alt='유저이미지' />
                      </S.UserImgBox>
                      <S.UserInfoBox>
                        <div>{user.name}</div>
                        <p>{user.about}</p>
                      </S.UserInfoBox>
                    </S.UserItem>
                  </Link>
                </li>
              );
            })
          ) : (
            <EmptySearch />
          )}
        </S.UserList>
      </section>
    </S.SearchListBox>
  );
}
