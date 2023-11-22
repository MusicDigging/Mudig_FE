import React from 'react';
import styled from 'styled-components';
import { ImageStyle } from '../Image/Image';

export default function PlayListItem(props) {
  const { children, img, title, info } = props;

  return (
    <PlayListItemWrap>
      <PlayListItemBtn>
        <ImageBox>
          <Image src={img} alt='플레이 리스트 커버 이미지' />
          {/* 'img' props로 이미지 src 삽입 */}
        </ImageBox>
        <InfoBox>
          <div>{title}</div> {/* 제목 */}
          <p>{info}</p> {/* 제목 및 설명, 곡 / 아티스트명 * 정보 / 만든이 */}
        </InfoBox>
      </PlayListItemBtn>
      {children} {/* 버튼 삽입 */}
    </PlayListItemWrap>
  );
}

const PlayListItemWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 0;
`;

const PlayListItemBtn = styled.button`
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

const Image = styled(ImageStyle)``;

const InfoBox = styled.div`
  width: 210px;
  font-size: var(--font-md);
  div {
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  p:last-child {
    color: var(--sub-font-color);
  }
`;
