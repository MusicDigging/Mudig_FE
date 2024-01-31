import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SearchIcon from '../../img/search-icon.svg';
interface Props {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
export default function SearchInput({ setInputValue, onSubmit }: Props) {
  const { keyword } = useParams() as { keyword: string };
  const location = useLocation();
  const path = location.pathname;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (path === '/search') {
      inputRef.current!.value = '';
    } else {
      inputRef.current!.value = keyword;
    }
  }, [path]);
  return (
    <header>
      <form onSubmit={onSubmit} role='search'>
        <label htmlFor='search' className='a11y-hidden'>
          검색
        </label>
        <Input
          id='search'
          onChange={handleInputChange}
          type='text'
          placeholder='플리, 유저, 노래를 검색하세요'
          autoComplete='off'
          ref={inputRef}
        />
        <button>
          <img src={SearchIcon} alt='검색' />
        </button>
      </form>
    </header>
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
