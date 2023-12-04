import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';
export default function PlaylistPrivateCheck() {
  return (
    <PlaylistPrivateCheckBox>
      <PlaylistInfoBox>
        <h3>드라이브 할 때 듣기 좋은 K-POP</h3>
        <p>공개</p>
      </PlaylistInfoBox>
      <Button>
        <ArrowIcon fill='black' />
      </Button>
    </PlaylistPrivateCheckBox>
  );
}
const PlaylistPrivateCheckBox = styled.div`
  padding: 0 16px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
`;
const PlaylistInfoBox = styled.div`
  p {
    margin-top: 7.5px;
    font-size: var(--font-sm);
    color: var(--sub-font-color);
  }
`;
const Button = styled.button`
  img {
    transform: rotate(270deg);
  }
`;
