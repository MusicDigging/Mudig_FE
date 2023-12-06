import React from 'react';

import styled from 'styled-components';
import { Image } from '../common/Image/Image';

export default function MainPlayList(props) {
  const music = props.data || [];
  return (
    <MainPlayListWrap>
      <ul className='scrollable-element'>
        {/* {music.map((item) => (
          <>
            <StyledListItem>
              <Image src='https://picsum.photos/200' alt='플리 이미지' />

              <h4>All I Want for Christmas Is You</h4>
              <p>Mariah Carey(머라이어 캐리)</p>
            </StyledListItem>
          </>
        ))} */}
        <StyledListItem>
          <Image src='https://picsum.photos/200' alt='플리 이미지' />

          <h4>All I Want for Christmas Is You</h4>
          <p>Mariah Carey(머라이어 캐리)</p>
        </StyledListItem>
        <StyledListItem>
          <Image src='https://picsum.photos/200' alt='플리 이미지' />

          <h4>All I Want for Christmas Is You</h4>
          <p>Mariah Carey(머라이어 캐리)</p>
        </StyledListItem>
        <StyledListItem>
          <Image src='https://picsum.photos/200' alt='플리 이미지' />

          <h4>All I Want for Christmas Is You</h4>
          <p>Mariah Carey(머라이어 캐리)</p>
        </StyledListItem>
        <StyledListItem>
          <Image src='https://picsum.photos/200' alt='플리 이미지' />

          <h4>All I Want for Christmas Is You</h4>
          <p>Mariah Carey(머라이어 캐리)</p>
        </StyledListItem>
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
      border: 3px solid #191919; /* 스크롤 바 핸들 테두리 투명하게 */
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
