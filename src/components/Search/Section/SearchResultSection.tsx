import styled from 'styled-components';
import {
  SearchResultTitleOnly,
  SearchResultTitleWithMove,
} from './SearchResultTitle';
import SearchResultList from './SearchResultList';
import { SearchResultItem, SearchResultLinkItem } from './SearchResultItem';

interface Props {
  style?: string;
  children: React.ReactNode;
}

function SearchResultSectionMain({ children, style }: Props) {
  return <Section className={style}>{children}</Section>;
}
const ResultSection = Object.assign(SearchResultSectionMain, {
  Title: SearchResultTitleOnly,
  TitleWithMove: SearchResultTitleWithMove,
  List: SearchResultList,
  Item: SearchResultItem,
  LinkItem: SearchResultLinkItem,
});

export default ResultSection;

const Section = styled.section`
  &.scroll {
    height: calc(100vh - 220px);
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
