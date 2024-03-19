import EmptySearch from './EmptySearch';

interface Props {
  itemCnt: number;
  children: React.ReactNode;
}

export default function SearchResultList({ itemCnt, children }: Props) {
  if (itemCnt === 0) return <EmptySearch />;
  return <ul>{children}</ul>;
}
