import { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';

export default function PlaylistDetail() {
  const location = useLocation();
  const state = location.state;
  const id = state?.id || 20; // location.state
  const { data, isLoading } = useGetPlaylistDetail(id);
  const [playing, setPlaying] = useState(false);
  if (isLoading) return;

  const { playlist, comments, music, user } = data;

  const musicList = music.map((obj) => obj.information);

  return (
    <>
      <PlaylistDetailWrap>
        <PlayListInfo musicList={musicList} />

        <MusicPlayer musicList={musicList} />

        <MusicPlayBar playing={playing} setPlaying={setPlaying} />
        <PlayListDetailBox>
          <DetailList music={music} />
      <CommentSection />
        </PlayListDetailBox>
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
const PlayListDetailBox = styled.main`
  height: 100%;
  padding-bottom: 0;
`;
