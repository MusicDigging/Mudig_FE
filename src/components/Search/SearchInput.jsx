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
        placeholder='검색어를 입력하세요.'
        // defaultValue={keyword}
        ref={inputRef}
      />
      <button>
        <img src={SearchIcon} alt='검색버튼' />
      </button>
    </form>
  );
}
const Input = styled.input`
  width: 274px;
  border-radius: 8px;
  background: #f6f6f6;
  padding: 12px 16px;
  margin-right: 19px;
  &:placeholder {
    color: #bfbfbf;
  }
`;
