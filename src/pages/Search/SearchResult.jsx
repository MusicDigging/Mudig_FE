import styled from 'styled-components';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchNav from '../../components/Search/SearchNav';
import SearchResultAll from '../../components/Search/SearchResultAll';
import SearchResultByType from '../../components/Search/SearchResultByType';
import { useSearch } from '../../hooks/queries/useSearch';

export default function SearchResult() {
  const { keyword } = useParams();
  const { data, isLoading, refetch } = useSearch(keyword);
  const result = data;
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    user: false,
  });

  useEffect(() => {
    refetch();
  }, [keyword]);

  if (isLoading) return;
  return (
    <>
      <SearchNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
      <SearchResultBox>
        {currentNav.all && (
          <SearchResultAll result={result} setCurrentNav={setCurrentNav} />
        )}
        {(currentNav.playlist || currentNav.user) && (
          <SearchResultByType result={result} currentNav={currentNav} />
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
