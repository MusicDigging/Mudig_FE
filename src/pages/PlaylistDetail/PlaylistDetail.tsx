import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  userInfoAtom,
  PlayListAtom,
  backAnimationAtom,
  commentEditIdAtom,
} from '../../library/atom';
import { IMusic } from '../../types/playlist';
import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';

import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import Loading from '../../components/Loading/Loading';

export default function PlaylistDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.id || location.pathname.split('/').pop(); // state로 받아오기 or url pathname에서 가져오기
  const { data, isLoading, isError } = useGetPlaylistDetail(playlistId);
  const myId = useRecoilValue(userInfoAtom)?.id;
  const [pause, setPause] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currMusic, setCurrMusic] = useState<number | null>(null);
  const setEditId = useSetRecoilState(commentEditIdAtom);
  const setPlaylistInfo = useSetRecoilState(PlayListAtom);
  const setBackAnimation = useSetRecoilState(backAnimationAtom);

  useEffect(() => {
    setEditId(null);
  }, []);

  useEffect(() => {
    if (!data || isLoading) return;
    const { playlist, music } = data;
    setPlaylistInfo({ playlist, music });
    setBackAnimation(false);
  }, [data, isLoading, setPlaylistInfo]);

  if (!data || isLoading) return <Loading isLoading={isLoading} />;
  if (isError) {
    navigate('/*');
    // return;
  }
  const { playlist, comments, music, user } = data;
  const musicList = music.map((obj: IMusic) => obj.information);
  const musicLength = music.length;

  return (
    <>
      <PlaylistDetailWrap>
        <PlayListInfo user={user} playlist={playlist} playing={playing} />
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
          playlist={playlist}
          playlistId={playlistId}
          pause={pause}
          setPause={setPause}
          playing={playing}
          setPlaying={setPlaying}
          setCurrMusic={setCurrMusic}
        />
        <PlayListDetailBox>
          {musicLength === 0 ? (
            <MusicNothingSection>
              <p>들을 수 있는 노래가 없어요 🥲</p>
              {myId === user.id && (
                <>
                  <span>노래를 추가해보세요! 🎵</span>
                  <Link to='/randomplay'>음악 추가하러 가기</Link>
                </>
              )}
            </MusicNothingSection>
          ) : (
            <DetailList
              pause={pause}
              setPause={setPause}
              playing={playing}
              setPlaying={setPlaying}
              music={music}
              currMusic={currMusic}
              setCurrMusic={setCurrMusic}
            />
          )}
          <CommentSection
            playlistId={playlistId}
            playlistWriter={playlist.writer}
            comments={comments}
          />
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
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0;
  background-color: #fff;
`;
const MusicNothingSection = styled.section`
  &,
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  width: 100%;
  text-align: center;
  font-size: var(--font-md);
  color: var(--font-color);
  line-height: normal;
  padding: 50px 16px 66px;
  p {
    font-weight: var(--font-semi-bold);
  }
  span {
    font-size: var(--font-sm);
  }
  a {
    width: 243px;
    height: 44px;
    padding: 8px 16px;
    margin-top: 16px;
    border-radius: 10px;
    background: #f5f2ff;
    color: var(--main-color);
    font-weight: var(--semi-font-bold);
  }
`;
