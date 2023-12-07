import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg';
import { privateInstance } from '../../library/apis/axiosInstance';
export default function SearchInput(props) {
  const { setResult } = props;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const SearchSubmit = (e) => {
    e.preventDefault();
    getSearchData(inputValue);
  };

  const getSearchData = async (query) => {
    try {
      const res = await privateInstance.get(`/playlist/search/?query=${query}`);
      setResult(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={SearchSubmit}>
      <Input
        onChange={handleInputChange}
        type='text'
        placeholder='검색어를 입력하세요.'
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
