import styled from 'styled-components';
import { CircleImage } from '../common/Image/Image';
interface Props {
  src: string;
  name: string;
  about: string;
}
export default function UserItem({ src, name, about }: Props) {
  return (
    <UserItemWrap>
      <CircleImage src={src} alt='유저이미지' />
      <div>
        <p>{name}</p>
        <p>{about}</p>
      </div>
    </UserItemWrap>
  );
}
const UserItemWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: var(--font-md);
  padding: 8px 0;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  div {
    margin-bottom: 3px;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    p {
      color: var(--sub-font-color);
    }
  }
`;
