import { useState } from 'react';
import styled from 'styled-components';


import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';

export default function PlaylistDetail() {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <PlaylistDetailWrap>
        <PlayListBox>
      <DetailList />
      <CommentSection />
        </PlayListBox>
      <CommentForm />
      </PlaylistDetailWrap>
    </>
  );
}
const PlaylistDetailWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const PlayListBox = styled.main`
  height: 100%;
  padding-bottom: 0;
`;
