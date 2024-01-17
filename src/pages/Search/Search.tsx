import SearchInput from '../../components/Search/SearchInput';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Search() {
  const navigate = useNavigate();
  const [recentKeywords, setRecentKeywords] = useState(
    JSON.parse(localStorage.getItem('recent_keywords')) || [],
  );
  const [inputValue, setInputValue] = useState('');

  const SearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    handleAddRecentKeyword(inputValue);
    navigate(`/search/${inputValue}`);
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
  // 검색했을 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('recent_keywords', JSON.stringify(recentKeywords));
  }, [recentKeywords]);

  // 검색 페이지일 때 7일 이내 검색 기록만 남기도록 함
  useEffect(() => {
    const now = new Date().getTime();
    const savedKeywords = recentKeywords.filter((keyword) => {
      const createdTime = new Date(keyword.id);
      const diffTime = now - createdTime;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    });
    setRecentKeywords(savedKeywords);
  }, []);
  return (
    <SearchWrap>
      <SearchInput setInputValue={setInputValue} onSubmit={SearchSubmit} />
      <Outlet
        context={{
          recentKeywords: recentKeywords.slice(0, 3),
          handleRemoveRecentKeyword,
          handleRemoveAllRecentKeyword,
        }}
      />
    </SearchWrap>
  );
}
const SearchWrap = styled.div`
  background-color: #fff;
  height: 100%;
  padding: 13px 16px;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 19px;
    margin-bottom: 8px;
    button {
      width: 24px;
      height: 24px;
    }
  }
`;
