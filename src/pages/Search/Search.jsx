import SearchInput from '../../components/Search/SearchInput';
import RecentSearch from '../../components/Search/RecentSearch';
import { useState, useEffect } from 'react';
import * as S from './SearchStyle';
import SearchResultAll from '../../components/Search/SearchResultAll';
import { useQuery } from 'react-query';
import SearchNav from '../../components/Search/SearchNav';
import SearchResultByType from '../../components/Search/SearchResultByType';
import { privateInstance } from '../../library/apis/axiosInstance';
export default function Search() {
  const [result, setResult] = useState();
  const [currentNav, setCurrentNav] = useState({
    all: true,
    playlist: false,
    user: false,
  });
  const [recentKeywords, setRecentKeywords] = useState(
    JSON.parse(localStorage.getItem('recent_keywords')) || [],
  );
  const [inputValue, setInputValue] = useState('');

  const SearchSubmit = (e) => {
    e.preventDefault();
    getSearchData(inputValue);
    handleAddRecentKeyword(inputValue);
  };

  const getSearchData = async (query) => {
    try {
      const res = await privateInstance.get(`/playlist/search/?query=${query}`);
      setResult(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  // 최근 검색어 추가
  const handleAddRecentKeyword = (keyword) => {
    const isKeywordExist = recentKeywords.some(
      (item) => item.keyword === keyword,
    );
    let updatedKeywords;
    // 이미 검색한 단어인 경우
    if (isKeywordExist) {
      updatedKeywords = recentKeywords.filter(
        (item) => item.keyword !== keyword,
      );
    } else {
      updatedKeywords = recentKeywords;
    }

    const newKeyword = {
      id: Date.now(),
      keyword,
    };

    setRecentKeywords([newKeyword, ...updatedKeywords]);
  };
  // 최근 검색어 선택 삭제
  const handleRemoveRecentKeyword = (id) => {
    const nextKeywords = recentKeywords.filter((keyword) => keyword.id !== id);
    setRecentKeywords(nextKeywords);
  };
  // 최근 검색어 전체 삭제
  const handleRemoveAllRecentKeyword = () => {
    setRecentKeywords([]);
  };
  // const { data } = useQuery(['result'], getSearchData);

  // 검색했을 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('recent_keywords', JSON.stringify(recentKeywords));
  }, [recentKeywords]);

  return (
    <S.SearchWrap>
      <SearchInput
        setResult={setResult}
        setInputValue={setInputValue}
        onSubmit={SearchSubmit}
        onAddRecentKeyword={handleAddRecentKeyword}
      />
      {/* 최근 검색어 */}
      {!result && recentKeywords.length !== 0 && (
        <RecentSearch
          recentKeywords={recentKeywords.slice(0, 3)}
          onRemoveRecentKeyword={handleRemoveRecentKeyword}
          onRemoveAllRecentKeyword={handleRemoveAllRecentKeyword}
          getSearchData={getSearchData}
        />
      )}
      {/* 검색 결과 */}
      {result && (
        <>
          <SearchNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
          {currentNav.all && (
            <SearchResultAll result={result} setCurrentNav={setCurrentNav} />
          )}
          {(currentNav.playlist || currentNav.user) && (
            <SearchResultByType result={result} currentNav={currentNav} />
          )}
        </>
      )}
    </S.SearchWrap>
  );
}
