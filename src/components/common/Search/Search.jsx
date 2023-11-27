import styled from 'styled-components';
import SearchIcon from '../../../img/search-icon.svg';
export default function Search(props) {
  const { children, onFocus, onBlur } = props;
  return (
    <form>
      <SearchInput
        type='text'
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder='검색어를 입력하세요.'
      />
      {children}
    </form>
  );
}
const SearchInput = styled.input`
  width: 274px;
  border-radius: 8px;
  background: #f6f6f6;
  padding: 12px 16px;
  margin-right: 19px;
  &:placeholder {
    color: #bfbfbf;
  }
`;
