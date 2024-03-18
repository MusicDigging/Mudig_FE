import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';

interface Props {
  children: React.ReactNode;
}

interface LinkProps {
  onNavClick: any;
  type: 'PLAYLIST' | 'USER';
}

function SearchResultTitle({ children }: Props) {
  return <h2>{children} 검색결과</h2>;
}

export function SearchResultTitleOnly({ children }: Props) {
  return (
    <SearchListTitleBox>
      <SearchResultTitle>{children}</SearchResultTitle>
    </SearchListTitleBox>
  );
}

export function SearchResultTitleWithMove({
  children,
  onNavClick,
  type,
}: Props & LinkProps) {
  return (
    <SearchListTitleBox>
      <SearchResultTitle>{children}</SearchResultTitle>
      <button
        onClick={() => onNavClick(type)}
        aria-label={`${children}결과더보기`}
      >
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
  margin-bottom: 12px;
  h2 {
    font-size: 20px;
  }
`;
