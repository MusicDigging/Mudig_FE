import styled from 'styled-components';

export default function EmptySearch() {
  return <EmptySearchWrap>검색결과없음</EmptySearchWrap>;
}

const EmptySearchWrap = styled.div`
  /* width: 100%; */
  font-size: var(--font-xl);
  color: var(--sub-font-color);
  text-align: center;
  padding: 90px 0;
`;
