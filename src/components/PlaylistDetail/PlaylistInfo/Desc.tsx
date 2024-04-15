import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PlayListAtom } from '../../../library/atom';

interface Props {
  modifiedContent?: string;
}
export default function Desc({ modifiedContent }: Props) {
  const { playlist } = useRecoilValue(PlayListAtom);

  return (
    <DescriptionBox>
      <p>{modifiedContent || playlist?.content}</p>
    </DescriptionBox>
  );
}
const DescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  p {
    color: var(--sub-font-color);
    font-size: var(--font-sm);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;
