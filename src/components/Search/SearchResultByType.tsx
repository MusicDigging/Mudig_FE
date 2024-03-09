import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleImage } from '../common/Image/Image';
import PlayListItem from '../common/PlayList/PlayListItem';
import EmptySearch from './EmptySearch';
import SearchResultTitle from './SearchResultTitle';
import AddPlaylist from '../../img/add-video-icon.svg';
import { ISearchResult } from '../../types/search';
import { ISearchNav } from '../../types/search';
import * as S from './SearchResultByTypeStyle';
interface Props {
  result: ISearchResult;
  currentNav: ISearchNav;
  handleAddPlaylist: (arg0: number) => void;
}
export default function SearchResultByType(props: Props) {
  const { result, currentNav, handleAddPlaylist } = props;
  const musicResult = result.search_music[0]?.music;
  const [type, setType] = useState('');
  const [tabType, setTabType] = useState({ playlist: true, music: true });

  const PlayList = () => {
    return (
      <ul>
        <SearchResultTitle
          title='플리 검색결과'
          ariaLabel='플리 검색결과 더보기'
        />
        {result.playlists.length !== 0 ? (
          result.playlists.map((item) => (
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
                  typeof item.writer === 'string' &&
                  item.writer === '유저 정보 없음'
                    ? '알 수 없는 사용자'
                    : item.writer.name
                }
              />
            </Link>
          ))
        ) : (
          <EmptySearch />
        )}
      </ul>
    );
  };
  const MusicList = () => {
    return (
      <ul>
        <SearchResultTitle
          title='노래 검색결과'
          ariaLabel='노래 검색결과 더보기'
        />
        {result.search_music.length !== 0 ? (
          musicResult.map((music) => {
            return (
              <PlayListItem
                key={music.id}
                img={music.thumbnail}
                title={music.song}
                info={music.singer}
              >
                <button
                  type='button'
                  onClick={() => handleAddPlaylist(music.id)}
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
    );
  };

  useEffect(() => {
    const SearchResultType = () => {
      if (result) {
        if (currentNav.playlist) setType('playlist');
        else if (currentNav.user) setType('user');
      }
    };
    SearchResultType();
  }, [currentNav]);

  return (
    <>
      {/* 플리 결과만 */}
      {type === 'playlist' && (
        <>
          <S.TabButtonBox>
            <S.TabButton
              type='button'
              name='playlist'
              onClick={() =>
                setTabType({ ...tabType, playlist: !tabType.playlist })
              }
              active={tabType.playlist}
            >
              플리
            </S.TabButton>
            <S.TabButton
              type='button'
              name='music'
              onClick={() => setTabType({ ...tabType, music: !tabType.music })}
              active={tabType.music}
            >
              노래
            </S.TabButton>
          </S.TabButtonBox>
          <S.PlaylistWrap>
            {tabType.playlist && <PlayList />}
            {tabType.music && <MusicList />}
          </S.PlaylistWrap>
        </>
      )}
      {/* 유저 결과만 */}
      {type === 'user' && (
        <>
          <h2 className='a11y-hidden'>유저 검색 결과</h2>
          <S.UserList>
            {result.users.length !== 0 ? (
              result.users.map((user) => {
                return (
                  <Link
                    to={`/user/profile/${user.id}`}
                    key={user.id}
                    state={{ id: user.id }}
                  >
                    <S.UserItem key={user.id}>
                      <S.UserImgBox>
                        <CircleImage src={user.image} alt='유저이미지' />
                      </S.UserImgBox>
                      <S.UserInfoBox>
                        <div>{user.name}</div>
                        <p>{user.about}</p>
                      </S.UserInfoBox>
                    </S.UserItem>
                  </Link>
                );
              })
            ) : (
              <EmptySearch />
            )}
          </S.UserList>
        </>
      )}
    </>
  );
}
