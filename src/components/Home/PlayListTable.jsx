import React from 'react';
import styled from 'styled-components';
import PlayIcon from '../../img/play-icon-white.svg';
import { Image } from '../common/Image/Image';

function PlayListTable({ liSize }) {
  return (
    <PlayListTableWrap liSize={liSize}>
      <ul className='scrollable-element'>
        <StyledListItem liSize={liSize}>
          <ImageBox liSize={liSize}>
            <Image src='https://picsum.photos/200' alt='플리 이미지' />
          </ImageBox>
          <PlayIconImg
            src={PlayIcon}
            alt='재생 바로가기 아이콘'
            liSize={liSize}
          />
          <p>드라이브 할 때 듣기 좋은 K-POP</p>
        </StyledListItem>
        <StyledListItem liSize={liSize}>
          <ImageBox liSize={liSize}>
            <Image src='https://picsum.photos/200' alt='플리 이미지' />
          </ImageBox>
          <PlayIconImg
            src={PlayIcon}
            alt='재생 바로가기 아이콘'
            liSize={liSize}
          />
          <p>드라이브 할 때 듣기 좋은 K-POP</p>
        </StyledListItem>
        <StyledListItem liSize={liSize}>
          <ImageBox liSize={liSize}>
            <Image src='https://picsum.photos/200' alt='플리 이미지' />
          </ImageBox>
          <PlayIconImg
            src={PlayIcon}
            alt='재생 바로가기 아이콘'
            liSize={liSize}
          />
          <p>드라이브 할 때 듣기 좋은 K-POP</p>
        </StyledListItem>
        <StyledListItem liSize={liSize}>
          <ImageBox liSize={liSize}>
            <Image src='https://picsum.photos/200' alt='플리 이미지' />
          </ImageBox>
          <PlayIconImg
            src={PlayIcon}
            alt='재생 바로가기 아이콘'
            liSize={liSize}
          />
          <p>드라이브 할 때 듣기 좋은 K-POP</p>
        </StyledListItem>
      </ul>
    </PlayListTableWrap>
  );
}
// 기본 props 설정
PlayListTable.defaultProps = {
  liSize: {
    width: '118px', // 기본 너비 설정
  },
};
export default PlayListTable;

const PlayListTableWrap = styled.div`
  ul {
    width: 360px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    flex-wrap: nowrap;
    gap: 9px;
    padding: 12px 0 12px 16px;
    scrollbar-width: thin; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      height: 10px; /* Chrome, Safari, Opera - 스크롤 바의 높이 유지 */
      background: transparent; /* 스크롤 바 트랙 투명하게 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent; /* 스크롤 바 핸들 투명하게 */
      border-radius: 10px;
      border: 3px solid transparent; /* 스크롤 바 핸들 테두리 투명하게 */
    }
  }

  ul:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #d6d6d6; /* 호버 시에만 스크롤 바 핸들 보이게 */
    }
  }
`;

const StyledListItem = styled.li`
  width: ${(props) => props.liSize?.width};
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 9px;
  }
  position: relative;
`;

const ImageBox = styled.div`
  width: ${(props) => props.liSize?.width};
  height: ${(props) => props.liSize?.width};
  border-radius: 8px;
`;
const PlayIconImg = styled.img`
  position: absolute;
  bottom: ${(props) =>
    0.17647 * parseInt(props.liSize.width, 10) - 12.32353 + 26}px;
  right: ${(props) => 0.17647 * parseInt(props.liSize.width, 10) - 12.32353}px;
  width: 19.5px; // 레이어 이미지의 고정된 가로 길이
`;