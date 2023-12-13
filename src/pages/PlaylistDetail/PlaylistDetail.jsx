import { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import {
  useGetPlaylistDetail,
  useLikePlaylist,
} from '../../hooks/queries/usePlaylist';
import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';

import LikeIcon from '../../img/like-icon.svg';
import LikeActiveIcon from '../../img/like-active-icon.svg';

export default function PlaylistDetail() {
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.id || location.pathname.split('/').pop(); // state로 받아오기 or url pathname에서 가져오기
  const { data, isLoading, isError } = useGetPlaylistDetail(playlistId);
  const [pause, setPause] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currMusic, setCurrMusic] = useState(null);
  const { mutate: likePlaylist } = useLikePlaylist();

  if (isLoading) return null;
  if (isError) {
    return <NotFound />;
  }
  const { playlist, comments, music, user } = data;

  const musicList = music.map((obj) => obj.information);

  const handleLikeBtnClick = () => {
    const data = { playlist_id: playlist.id };
    likePlaylist(data);
  };

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
          playlistId={playlistId}
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
        {/* <LikeBtn onClick={handleLikeBtnClick}>
          <img
            src={playlist.like_playlist ? LikeActiveIcon : LikeIcon}
            alt='좋아요'
          />
          <p>{playlist.like_count}</p>
        </LikeBtn> */}
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
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0;
`;
const LikeBtn = styled.button`
  height: 24px;
  display: flex;
  font-size: var(--font-md);

  img {
    width: 24px;
    height: 100%;
    vertical-align: middle;
  }
`;
