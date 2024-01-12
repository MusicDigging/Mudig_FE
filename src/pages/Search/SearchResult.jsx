import styled from 'styled-components';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchNav from '../../components/Search/SearchNav';
import SearchResultAll from '../../components/Search/SearchResultAll';
import SearchResultByType from '../../components/Search/SearchResultByType';
import { useSearch, useSearchMusic } from '../../hooks/queries/useSearch';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import AddModal from '../../components/common/Modal/AddModal';

export default function SearchResult() {
  const { keyword } = useParams();
  const { data, isLoading, refetch } = useSearch(keyword);
  const result = data;
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    user: false,
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const [musicId, setMusicId] = useState('');
  const handleAddPlaylist = (musicId) => {
    setMusicId(musicId);
    setModalOpen(true);
  };
  useEffect(() => {
    refetch();
    setCurrentNav({ all: true, playlist: false, user: false });
  }, [keyword]);

  if (isLoading) return;
  return (
    <>
      {modalOpen && <AddModal videoId={musicId} />}
      <SearchNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
      <SearchResultBox>
        {currentNav.all && (
          <SearchResultAll
            result={result}
            setCurrentNav={setCurrentNav}
            handleAddPlaylist={handleAddPlaylist}
          />
        )}
        {(currentNav.playlist || currentNav.user) && (
          <SearchResultByType
            result={result}
            currentNav={currentNav}
            handleAddPlaylist={handleAddPlaylist}
          />
        )}
      </SearchResultBox>
    </>
  );
}
const SearchResultBox = styled.div`
  height: calc(100% - 89px);
  overflow-y: scroll;
  padding-bottom: 116px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
