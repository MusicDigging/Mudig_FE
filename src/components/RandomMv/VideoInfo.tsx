// VideoInfo.js
import React, { useState } from 'react';
import styled from 'styled-components';
import addIcon from '../../img/add-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IVideoInfoProps } from '../../types/RandomMv';
import { modalAtom } from '../../atoms/modalAtom';

const VideoInfo = ({ title, views, onAddButtonClick }: IVideoInfoProps) => {
  const handleAddButtonClick = () => {
    //플리추가 콜백
    if (onAddButtonClick) {
      onAddButtonClick();
    }
  };

  return (
    <InfoWrap>
      <InfoBox>
        <p>{title}</p>
        <span>{views}</span>
      </InfoBox>
      <img onClick={handleAddButtonClick} src={addIcon} alt='뮤비 추가 버튼' />
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  img {
    cursor: pointer;
  }
`;

const InfoBox = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;

  p {
    font-weight: var(--font-bold);
  }

  span {
    color: #575757;
  }
`;

export default VideoInfo;
