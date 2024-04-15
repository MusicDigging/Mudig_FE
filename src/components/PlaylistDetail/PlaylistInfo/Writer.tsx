import { CircleImage } from '../../common/Image/Image';
import ProfileBadge from '../../../img/badge-icon.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PlayListAtom } from '../../../library/atom';
import { useRecoilValue } from 'recoil';

export default function Writer() {
  const { user } = useRecoilValue(PlayListAtom);

  return (
    <WriterInfo to={`/user/profile/${user?.id}`} state={{ id: user?.id }}>
      <CircleImage src={user?.image} alt='프로필 이미지' />
      <img src={ProfileBadge} alt='프로필 작성자 배지' />
      <p>{user?.name}</p>
    </WriterInfo>
  );
}

const WriterInfo = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;

  img:first-child {
    width: 24px;
    height: 24px;
  }

  p {
    font-size: var(--font-sm);
    font-weight: var(--font-semi-bold);
  }
`;
