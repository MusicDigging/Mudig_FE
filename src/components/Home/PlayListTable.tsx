import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayIcon from '../../img/play-icon-white.svg';
import { Image } from '../common/Image/Image';
import * as S from '../../pages/Home/HomeStyle';

interface IPlaylistItem {
  id: string;
  thumbnail: string;
  title: string;
}

interface ILiSize {
  width: string;
}

interface Props {
  liSize: ILiSize;
  playlistData: IPlaylistItem[];
  title: string; // 각 섹션의 타이틀을 위한 프로퍼티
  moreLink: string; // "더 보기" 링크의 경로를 위한 프로퍼티
}

export default function PlayListTable({
  liSize,
  playlistData,
  title,
  moreLink,
}: Props) {
  return (
    <PlayListTableWrap>
      {/* 섹션 타이틀과 "더 보기" 버튼 */}
      <S.PlaylistNameBox>
        <h2>{title}</h2>
        <Link to={moreLink} state={{ data: playlistData }}>
          <S.MoreBtn />
        </Link>
      </S.PlaylistNameBox>
      <ul>
        {playlistData.map((item) => (
          <StyledListItem key={item.id} liSize={liSize}>
            <Link to={`/playlist/detail/${item.id}`} state={{ id: item.id }}>
              <ImageBox liSize={liSize}>
                <Image src={item.thumbnail} alt={item.title} />
              </ImageBox>
              <PlayIconImg
                src={PlayIcon}
                alt='재생 바로가기 아이콘'
                liSize={liSize}
              />
              <p>{item.title}</p>
            </Link>
          </StyledListItem>
        ))}
      </ul>
    </PlayListTableWrap>
  );
}

PlayListTable.defaultProps = {
  liSize: {
    width: '118px', // 기본 너비 설정
  },
};

const PlayListTableWrap = styled.div`
  margin-bottom: 50px;

  ul {
    width: 100%;
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

const StyledListItem = styled.li<{ liSize: ILiSize }>`
  width: ${(props) => props.liSize?.width};
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 9px;
    height: 22px;
    font-size: 12px;
  }
  position: relative;
`;

const ImageBox = styled.div<{ liSize: ILiSize }>`
  width: ${(props) => props.liSize?.width};
  height: ${(props) => props.liSize?.width};
  border-radius: 8px;
`;
const PlayIconImg = styled.img<{ liSize: ILiSize }>`
  position: absolute;
  bottom: ${(props) =>
    0.17647 * parseInt(props.liSize.width, 10) - 12.32353 + 26}px;
  right: ${(props) => 0.17647 * parseInt(props.liSize.width, 10) - 12.32353}px;
  width: 19.5px;
`;
