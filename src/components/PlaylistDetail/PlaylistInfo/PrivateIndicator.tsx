import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PlayListAtom } from '../../../library/atom';

interface Props {
  modifiedPublic?: boolean;
}

export default function PrivateIndicator({ modifiedPublic }: Props) {
  const { playlist } = useRecoilValue(PlayListAtom);
  const value = modifiedPublic || playlist.is_public;

  return <PrivateCheck>{value ? '공개' : '비공개'}</PrivateCheck>;
}

const PrivateCheck = styled.p`
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
