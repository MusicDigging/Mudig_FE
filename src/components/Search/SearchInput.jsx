import styled from 'styled-components';
import SearchIcon from '../../img/search-icon.svg';
export default function SearchInput({ setInputValue, onSubmit }) {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
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
