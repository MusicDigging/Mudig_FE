import styled from 'styled-components';

export default function EmptySearch() {
  return <EmptySearchWrap>검색결과없음</EmptySearchWrap>;
}

const EmptySearchWrap = styled.div`
  height: 133px;
  font-size: var(--font-lg);
  color: #b0b0b0;
  text-align: center;
  padding: 55px 0;
`;
