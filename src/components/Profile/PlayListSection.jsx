import React from 'react';
import styled from 'styled-components';

import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';

import PlayIcon from '../../img/play-icon.svg';

export default function PlayListSection() {
  return (
    <PlayListSectionWrap>
      <PlayListBox>
        <PlayListHeader>
          <h2>내가 생성한 플레이리스트</h2>
          <SortBtnBox>
            <button>최신순</button>|<button>인기순</button>
          </SortBtnBox>
        </PlayListHeader>
        <PlayList>
          <PlayListItem
            img='https://picsum.photos/200'
            title='드라이브 할 때 듣기 좋은 K-POP'
            info='42곡'
          >
            <PlayBtnStyle type='button'>
              <img src={PlayIcon} alt='재생 바로가기 아이콘' />
            </PlayBtnStyle>
          </PlayListItem>
          <PlayListItem
            img='https://picsum.photos/200'
            title='드라이브 할 때 듣기 좋은 K-POP'
            info='42곡'
          >
            <PlayBtnStyle type='button'>
              <img src={PlayIcon} alt='재생 바로가기 아이콘' />
            </PlayBtnStyle>
          </PlayListItem>
          <PlayListItem
            img='https://picsum.photos/200'
            title='드라이브 할 때 듣기 좋은 K-POP'
            info='42곡'
          >
            <PlayBtnStyle type='button'>
              <img src={PlayIcon} alt='재생 바로가기 아이콘' />
            </PlayBtnStyle>
          </PlayListItem>
          <PlayListItem
            img='https://picsum.photos/200'
            title='드라이브 할 때 듣기 좋은 K-POP'
            info='42곡'
          >
            <PlayBtnStyle type='button'>
              <img src={PlayIcon} alt='재생 바로가기 아이콘' />
            </PlayBtnStyle>
          </PlayListItem>
        </PlayList>
      </PlayListBox>
    </PlayListSectionWrap>
  );
}

const PlayListSectionWrap = styled.section`
  padding: 26px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
  h2 {
    font-size: var(--font-md);
  }
`;
const PlayListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SortBtnBox = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 8px;
    font-size: var(--font-sm);
  }
  button:focus {
    color: var(--btn-border-color);
  }
`;

const PlayListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PlayBtnStyle = styled.button`
  display: flex;
  gap: 4px;
`;
