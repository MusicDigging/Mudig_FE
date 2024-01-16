import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

export default function SearchResultTitle({ title, handleNav }) {
  return (
    <SearchListTitleBox>
      <h2>{title}</h2>
      {handleNav && (
        <button onClick={handleNav}>
          <ArrowIcon fill='black' />
        </button>
      )}
    </SearchListTitleBox>
  );
}
const SearchListTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0;
  margin-bottom: 16px;
  h2 {
    font-size: 20px;
  }
`;
