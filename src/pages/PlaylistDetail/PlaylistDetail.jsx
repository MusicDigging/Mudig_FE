import { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';

export default function PlaylistDetail() {
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.id || 52; // location.state
  const { data, isLoading } = useGetPlaylistDetail(playlistId);
  const [pause, setPause] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currMusic, setCurrMusic] = useState(null);
  if (isLoading) return;

  const { playlist, comments, music, user } = data;

  const musicList = music.map((obj) => obj.information);

  return (
    <>
      <PlaylistDetailWrap>
        <PlayListInfo playlist={playlist} />
        {playing && (
          <MusicPlayer
            pause={pause}
            setPause={setPause}
            musicList={musicList}
            currMusic={currMusic}
            setCurrMusic={setCurrMusic}
          />
        )}
        <MusicPlayBar
          pause={pause}
          setPause={setPause}
          playing={playing}
          setPlaying={setPlaying}
          setCurrMusic={setCurrMusic}
        />
        <PlayListDetailBox>
          <DetailList
            setPause={setPause}
            playing={playing}
            setPlaying={setPlaying}
            music={music}
            currMusic={currMusic}
            setCurrMusic={setCurrMusic}
          />

          <CommentSection playlistId={playlistId} comments={comments} />
        </PlayListDetailBox>
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
