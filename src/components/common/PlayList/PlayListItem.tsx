import React from 'react';
import styled from 'styled-components';
import OrderChangeIcon from '../../../img/hamburger-icon.svg';
import { Image } from '../Image/Image';
import type {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

interface Props {
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  modify?: boolean;
  children?: React.ReactNode;
  img: string;
  title: string;
  info: string;
}

export default function PlayListItem(props: Props) {
  const {
    innerRef,
    draggableProps,
    dragHandleProps,
    modify,
    children,
    img,
    title,
    info,
  } = props;
  return (
    <PlayListItemWrap ref={innerRef} {...draggableProps}>
      <PlayListItemBox>
        {modify && (
          <button type='button' {...dragHandleProps}>
            <img src={OrderChangeIcon} alt='플레이 리스트 순서 변경 아이콘' />
          </button>
        )}
        <PlayListItemInfo>
          <ImageBox>
            <Image src={img} alt='플레이 리스트 커버 이미지' />
            {/* 'img' props로 이미지 src 삽입 */}
          </ImageBox>
          <InfoBox>
            <div>{title}</div> {/* 제목 */}
            <p>{info}</p> {/* 제목 및 설명, 곡 / 아티스트명 * 정보 / 만든이 */}
          </InfoBox>
        </PlayListItemInfo>
      </PlayListItemBox>
      {children} {/* 버튼 삽입 */}
    </PlayListItemWrap>
  );
}

const PlayListItemWrap = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 0;
`;
const PlayListItemBox = styled.div`
  display: flex;
  gap: 8px;
`;
const PlayListItemInfo = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  gap: 15px;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const InfoBox = styled.div`
  width: 210px;
  font-size: var(--font-md);
  div {
    margin-bottom: 7px;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: normal;
  }
  p:last-child {
    color: var(--extra-font-color);
  }
`;
