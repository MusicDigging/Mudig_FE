import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import {
  useGetPlaylistDetail,
  useLikePlaylist,
} from '../../hooks/queries/usePlaylist';

import NotFound from '../NotFound/NotFound';
import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';

import LikeIcon from '../../img/like-icon.svg';
import LikeActiveIcon from '../../img/like-active-icon.svg';
import { useRecoilState } from 'recoil';
import { PlayListAtom } from '../../library/atom';

export default function PlaylistDetail() {
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.id || location.pathname.split('/').pop(); // state로 받아오기 or url pathname에서 가져오기
  const { data, isLoading, isError } = useGetPlaylistDetail(playlistId);
  const [pause, setPause] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currMusic, setCurrMusic] = useState(null);
  const { mutate: likePlaylist } = useLikePlaylist();

  const [playlistInfo, setPlaylistInfo] = useRecoilState(PlayListAtom);

  useEffect(() => {
    if (isLoading) return;
    const { playlist, music } = data;
    setPlaylistInfo({ playlist, music });
  }, [data, isLoading, setPlaylistInfo]);

  if (isLoading) return null;
  if (isError) {
    return <NotFound />;
  }
  const { playlist, comments, music, user } = data;
  const musicList = music.map((obj) => obj.information);
  const musicLength = music.length;

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
          userId={user.id}
          playlistId={playlistId}
          pause={pause}
          setPause={setPause}
          playing={playing}
          setPlaying={setPlaying}
          setCurrMusic={setCurrMusic}
          playlist={playlist}
          music={music}
        />
        <PlayListDetailBox>
          {musicLength === 0 ? (
            <MusicNothingSection>
              <p>들을 수 있는 노래가 없어요 🥲</p>
              <span>노래를 추가해보세요! 🎵</span>
            </MusicNothingSection>
          ) : (
            <DetailList
              setPause={setPause}
              playing={playing}
              setPlaying={setPlaying}
              music={music}
              currMusic={currMusic}
              setCurrMusic={setCurrMusic}
            />
          )}
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
const MusicNothingSection = styled.section`
  width: 328px;
  text-align: center;
  font-size: var(--font-md);
  color: var(--font-color);
  line-height: normal;
  margin: 50px 16px 66px;
  p {
    font-weight: var(--font-semi-bold);
  }
  span {
    font-size: var(--font-sm);
  }
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
