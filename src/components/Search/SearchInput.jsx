import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg';
export default function SearchInput({ setInputValue, onSubmit }) {
  const { keyword } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (path === '/search') {
      inputRef.current.value = '';
    } else {
      inputRef.current.value = keyword;
    }
  }, [path]);
  return (
    <form onSubmit={onSubmit}>
      <Input
        onChange={handleInputChange}
        type='text'
        placeholder='플리, 유저, 노래를 검색하세요'
        ref={inputRef}
      />
      <button>
        <img src={SearchIcon} alt='검색버튼' />
      </button>
    </form>
  );
}
const Input = styled.input`
  min-width: 274px;
  width: calc(100% - 24px);
  border-radius: 8px;
  background: #f6f6f6;
  padding: 12px 16px;
  font-size: var(--font-md);
  &:placeholder {
    color: #bfbfbf;
  }
`;
