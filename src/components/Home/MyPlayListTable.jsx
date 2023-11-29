import React from 'react';
import styled from 'styled-components';

import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';

import PlayIcon from '../../img/play-icon.svg';

export default function MyPlayListTable() {
  return (
    <MyPlayListTableWrap>
      <PlayListBox>
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
    </MyPlayListTableWrap>
  );
}

const MyPlayListTableWrap = styled.section`
  border-radius: 8px 8px 0 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 0;
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
