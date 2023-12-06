import React, { useState } from 'react';
import styled from 'styled-components';

import MiniModal from '../common/Modal/MiniModal';

import PlayIcon from '../../img/play-icon.svg';
import PauseIcon from '../../img/pause-Icon.svg';
import MoreIcon from '../../img/more-icon.svg';
import ShareIcon from '../../img/share-icon.svg';
import { Link } from 'react-router-dom';

export default function MusicPlayBar(props) {
  const { playing, setPlaying } = props; // 상위 컴포넌트에 playing,setPlaying true로 정의
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (isModalOpen === false) setIsModalOpen(true);
    else setIsModalOpen(false);
  };

  const handlePlayBtn = () => {
    if (playing === false) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  return (
    <PlayBarWrap>
      <button>
        <img src={ShareIcon} alt='공유하기 버튼' />
      </button>
      <PlayBtn onClick={handlePlayBtn}>
        <img
          src={playing === true ? PauseIcon : PlayIcon}
          alt='재생/멈춤 버튼'
        />
      </PlayBtn>
      <MoreBtnBox>
        <button onClick={toggleModal}>
          <img src={MoreIcon} alt='더보기 버튼' />
        </button>
        {isModalOpen && (
          <MiniModal>
            <button>플리 삭제</button>
            <Link to='edit'>플리 수정</Link>
          </MiniModal>
        )}
      </MoreBtnBox>
    </PlayBarWrap>
  );
}

const PlayBarWrap = styled.div`
  padding: 9px 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;
  button img {
    vertical-align: middle;
  }
`;

const PlayBtn = styled.button`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  box-shadow: 0px -2px 20px 0px rgba(215, 176, 243, 0.25);
`;

const MoreBtnBox = styled.div`
  position: relative;
`;
