import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import { useState } from 'react';

export default function PlaylistDetail() {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <PlayListInfo playing={playing} setPlaying={setPlaying} />
      <MusicPlayBar playing={playing} setPlaying={setPlaying} />
      <DetailList />
      <CommentSection />
      <CommentForm />
    </>
  );
}
