import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from '../common/Image/Image';

export default function MainPlayList(props) {
  const { id } = props;
  const musicData = props.data || [];
  return (
    <MainPlayListWrap>
      <ul className='scrollable-element'>
        {musicData.map((music) => (
          <Link to='/playlist/detail' key={music.id} state={{ id }}>
            <StyledListItem>
              <Image src={music.thumbnail} alt='음악 이미지' />
              <h4>{music.song}</h4>
              <p>{music.singer}</p>
            </StyledListItem>
          </Link>
        ))}
      </ul>
    </MainPlayListWrap>
  );
}

const MainPlayListWrap = styled.div`
  ul {
    width: 360px;
    display: flex;
    overflow-x: scroll;

    flex-wrap: nowrap;
    gap: 9px;
    padding: 0 0 16px;
    scrollbar-width: thin; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      height: 3px; /* Chrome, Safari, Opera - 스크롤 바의 높이 유지 */
      background: #d6d6d6; /* 스크롤 바 트랙 투명하게 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent; /* 스크롤 바 핸들 투명하게 */
      border-radius: 10px;
      background-color: #191919;
    }
  }
`;

const StyledListItem = styled.li`
  width: 118px;
  img {
    width: 118px;
    height: 118px;
    margin-bottom: 9px;
  }
  h4,
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h4 {
    height: 20px;
    margin-top: 3px;
  }
  p {
    color: var(--extra-font-color);
    font-size: var(--font-sm);
  }
`;
