import SearchIcon from '../../img/search-icon.svg';
import SearchInput from '../../components/Search/SearchInput';
import RecentSearch from '../../components/Search/RecentSearch';
import { useState } from 'react';
import * as S from './SearchStyle';
import SearchResultByType from '../../components/Search/SearchResultByType';
// import { Outlet } from 'react-router-dom';
export default function Search() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <S.SearchWrap>
      <SearchInput
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      >
        {isSearchFocused ? (
          <button>취소</button>
        ) : (
          <button type='button'>
            <img src={SearchIcon} alt='검색버튼' />
          </button>
        )}
      </SearchInput>
      {/* {isSearchFocused ? <RecentSearch /> : <Outlet />} */}
      {isSearchFocused ? <RecentSearch /> : <SearchResultByType />}
    </S.SearchWrap>
  );
}
