import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PlayListAtom } from '../../../library/atom';

interface Props {
  modifiedTitle?: string;
}
export function DefaultTitle({ modifiedTitle }: Props) {
  const { playlist } = useRecoilValue(PlayListAtom);

  return (
    <TitleBox>
      <h2>{modifiedTitle || playlist?.title}</h2>
    </TitleBox>
  );
}

export function SummaryTitle() {
  const { playlist } = useRecoilValue(PlayListAtom);

  return <SummaryTitleStyle>{playlist.title}</SummaryTitleStyle>;
}

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  h2 {
    width: 100%;
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;

const SummaryTitleStyle = styled.h2`
  width: 180px;
  text-align: center;
  word-break: keep-all;
  line-height: normal;
  font-size: var(--font-lg);
  font-weight: var(--font-semi-bold);
  color: #fff;
  transform: translate(70%, 0px);
  margin-top: 30px;
`;
