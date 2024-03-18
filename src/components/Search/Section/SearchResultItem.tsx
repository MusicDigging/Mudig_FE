import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircleImage, Image } from '../../common/Image/Image';

interface Props {
  img: string;
  imgShape: 'CIRCLE' | 'RECTANGLE';
  title: string;
  info: string;
  children?: React.ReactNode;
}

function Item({ img, imgShape, title, info, children }: Props) {
  return (
    <ItemWrap>
      <ItemInfoBox>
        {imgShape === 'CIRCLE' && <CircleImage src={img} alt='유저이미지' />}
        {imgShape === 'RECTANGLE' && (
          <Image src={img} alt='플레이 리스트 커버 이미지' />
        )}
        <ItemInfo>
          <p>{title}</p>
          <p>{info}</p>
        </ItemInfo>
      </ItemInfoBox>
      {children}
    </ItemWrap>
  );
}

export function SearchResultItem({
  img,
  imgShape,
  title,
  info,
  children,
}: Props) {
  return (
    <li>
      <Item img={img} imgShape={imgShape} title={title} info={info}>
        {children}
      </Item>
    </li>
  );
}

interface ILinkProps extends Props {
  id: number;
  path: string;
}

export function SearchResultLinkItem({
  id,
  path,
  img,
  imgShape,
  title,
  info,
}: ILinkProps) {
  return (
    <li>
      <Link to={path} state={{ id: id }}>
        <Item img={img} imgShape={imgShape} title={title} info={info} />
      </Link>
    </li>
  );
}

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 0;
  font-size: var(--font-md);
`;
const ItemInfoBox = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  gap: 15px;
  img {
    width: 60px;
    height: 60px;
  }
`;
const ItemInfo = styled.div`
  width: 280px;
  white-space: nowrap;
  line-height: normal;
  -webkit-box-orient: vertical;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p:first-child {
    margin-bottom: 4px;
  }
  p:last-child {
    color: var(--extra-font-color);
  }
`;
