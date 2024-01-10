import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

export default function SearchResultTitle({ title, handleNavPlaylist }) {
  return (
    <SearchListTitleBox>
      <h2>{title}</h2>
      <button onClick={handleNavPlaylist}>
        <ArrowIcon fill='black' />
      </button>
    </SearchListTitleBox>
  );
}
const SearchListTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0;
  margin-bottom: 16px;
`;
