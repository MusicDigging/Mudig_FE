import SearchIcon from '../../img/search-icon.svg';
import SearchInput from '../../components/Search/SearchInput';
import RecentSearch from '../../components/Search/RecentSearch';
import { useState } from 'react';
import * as S from './SearchStyle';
import SearchResultAll from '../../components/Search/SearchResultAll';
import { privateInstance } from '../../library/apis/axiosInstance';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import SearchNav from '../../components/Search/SearchNav';
import SearchResultByType from '../../components/Search/SearchResultByType';
export default function Search() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [result, setResult] = useState();
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    user: false,
  });
  console.log('result', result);
  console.log(currentNav);
  // const { data } = useQuery(['result'], getSearchData);
  return (
    <S.SearchWrap>
      <SearchInput setResult={setResult} />
      {/* 최근 검색어 */}
      {!result && <RecentSearch />}

      {/* 검색 결과 */}
      {result && (
        <>
          <SearchNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
          {currentNav.all && (
            <SearchResultAll result={result} setCurrentNav={setCurrentNav} />
          )}
          {currentNav.playlist && (
            <SearchResultByType result={result} currentNav={currentNav} />
          )}
          {currentNav.user && (
            <SearchResultByType result={result} currentNav={currentNav} />
          )}
        </>
      )}
    </S.SearchWrap>
  );
}
