import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearch } from '../../hooks/queries/useSearch';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import AddPlaylist from '../../img/add-video-icon.svg';
import SearchNav from '../../components/Search/SearchNav';
import AddModal from '../../components/common/Modal/AddModal';
import Loading from '../../components/Loading/Loading';
import ResultSection from '../../components/Search/Section/SearchResultSection';
import TypeTabButton from '../../components/Search/Section/TypeTabButton';
export const LIST_TYPE = {
  PLAYLIST: 'PLAYLIST',
  USER: 'USER',
};
export default function SearchResult() {
  const { keyword } = useParams() as { keyword: string };
  const { data, isLoading, refetch } = useSearch(keyword);
  const { playlists, recent_playlists, recent_users, search_music, users } =
    data || {};
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    user: false,
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const [musicId, setMusicId] = useState<number>(0);
  const handleAddPlaylist = (musicId: number) => {
    setMusicId(musicId);
    setModalOpen(true);
  };
  const handleNavClick = (nav: string) => {
    setCurrentNav({
      all: false,
      playlist: nav === LIST_TYPE.PLAYLIST,
      user: nav === LIST_TYPE.USER,
    });
  };
  const [tabType, setTabType] = useState({ playlist: true, music: true });

  useEffect(() => {
    refetch();
    setCurrentNav({ all: true, playlist: false, user: false });
  }, [keyword]);

  if (isLoading) return <Loading isLoading={isLoading} />;
  return (
    <>
      <h1 className='a11y-hidden'>검색 결과</h1>
      {modalOpen && <AddModal videoId={musicId.toString()} />}
      <SearchNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
      <SearchResultBox>
        {/* 검색결과(전체) */}
        {currentNav.all && (
          <SearchListBox>
            <ResultSection>
              <ResultSection.TitleWithMove
                onNavClick={handleNavClick}
                type='PLAYLIST'
              >
                플리
              </ResultSection.TitleWithMove>
              <ResultSection.List itemCnt={recent_playlists.length}>
                {recent_playlists.map((item: any) => (
                  <ResultSection.LinkItem
                    key={item.playlist.id}
                    id={item.playlist.id}
                    path={`/playlist/detail/${item.playlist.id}`}
                    img={item.playlist.thumbnail}
                    imgShape='RECTANGLE'
                    title={item.playlist.title}
                    info={item.writer.name}
                  />
                ))}
              </ResultSection.List>
            </ResultSection>
            <ResultSection>
              <ResultSection.TitleWithMove
                onNavClick={handleNavClick}
                type='PLAYLIST'
              >
                노래
              </ResultSection.TitleWithMove>
              <ResultSection.List itemCnt={search_music.length}>
                {search_music[0] &&
                  search_music[0].music.slice(0, 3).map((item: any) => (
                    <ResultSection.Item
                      key={item.id}
                      img={item.thumbnail}
                      imgShape='RECTANGLE'
                      title={item.song}
                      info={item.singer}
                    >
                      <button
                        type='button'
                        onClick={() => handleAddPlaylist(item.id)}
                      >
                        <img src={AddPlaylist} alt='플레이리스트에추가' />
                      </button>
                    </ResultSection.Item>
                  ))}
              </ResultSection.List>
            </ResultSection>
            <ResultSection>
              <ResultSection.TitleWithMove
                onNavClick={handleNavClick}
                type='USER'
              >
                유저
              </ResultSection.TitleWithMove>
              <ResultSection.List itemCnt={recent_users.length}>
                {recent_users.map((item: any) => (
                  <ResultSection.LinkItem
                    key={item.id}
                    id={item.id}
                    path={`/user/profile/${item.id}`}
                    img={item.image}
                    imgShape='CIRCLE'
                    title={item.name}
                    info={item.name}
                  />
                ))}
              </ResultSection.List>
            </ResultSection>
          </SearchListBox>
        )}
        {/* 검색결과(플리) */}
        {currentNav.playlist && (
          <>
            <TypeTabButton tabType={tabType} setTabType={setTabType} />
            <ResultSectionBox>
              {tabType.playlist && (
                <ResultSection>
                  <ResultSection.Title>플리</ResultSection.Title>
                  <ResultSection.List itemCnt={playlists.length}>
                    {playlists.map((item: any) => (
                      <ResultSection.LinkItem
                        key={item.playlist.id}
                        id={item.playlist.id}
                        path={`/playlist/detail/${item.playlist.id}`}
                        img={item.playlist.thumbnail}
                        imgShape='RECTANGLE'
                        title={item.playlist.title}
                        info={item.writer.name}
                      />
                    ))}
                  </ResultSection.List>
                </ResultSection>
              )}
              {tabType.music && (
                <ResultSection>
                  <ResultSection.Title>노래</ResultSection.Title>
                  <ResultSection.List itemCnt={search_music.length}>
                    {search_music[0] &&
                      search_music[0].music.map((item: any) => (
                        <ResultSection.Item
                          key={item.id}
                          img={item.thumbnail}
                          imgShape='RECTANGLE'
                          title={item.song}
                          info={item.singer}
                        >
                          <button
                            type='button'
                            onClick={() => handleAddPlaylist(item.id)}
                          >
                            <img src={AddPlaylist} alt='플레이리스트에추가' />
                          </button>
                        </ResultSection.Item>
                      ))}
                  </ResultSection.List>
                </ResultSection>
              )}
            </ResultSectionBox>
          </>
        )}
        {/* 검색결과(유저) */}
        {currentNav.user && (
          <ResultSection style='scroll'>
            <h2 className='a11y-hidden'>유저 검색 결과</h2>
            <ResultSection.List itemCnt={users.length}>
              {users.map((item: any) => (
                <ResultSection.LinkItem
                  key={item.id}
                  id={item.id}
                  path={`/user/profile/${item.id}`}
                  img={item.image}
                  imgShape='CIRCLE'
                  title={item.name}
                  info={item.name}
                />
              ))}
            </ResultSection.List>
          </ResultSection>
        )}
      </SearchResultBox>
    </>
  );
}

const SearchResultBox = styled.div`
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SearchListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100vh - 230px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ResultSectionBox = styled(SearchListBox)`
  height: calc(100vh - 270px);
`;
