import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

interface Props {
  title: string;
  handleNav?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SearchResultTitle({ title, handleNav }: Props) {
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
