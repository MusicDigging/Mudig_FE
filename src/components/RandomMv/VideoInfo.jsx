// VideoInfo.js
import React from 'react';
import styled from 'styled-components';
import addIcon from '../../img/add-icon.svg';
const VideoInfo = ({ title, views }) => (
  <InfoWrap>
    <InfoBox>
      <p>{title}</p>
      <span>{views}</span>
    </InfoBox>
    <img src={addIcon} alt='뮤비 추가 버튼' />
  </InfoWrap>
);

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
