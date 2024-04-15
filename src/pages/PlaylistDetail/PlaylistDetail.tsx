import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';

import {
  userInfoAtom,
  PlayListAtom,
  backAnimationAtom,
  commentEditIdAtom,
} from '../../library/atom';
import { IMusic } from '../../types/playlist';
import {
  useDeletePlaylist,
  useGetPlaylistDetail,
} from '../../hooks/queries/usePlaylist';

import MusicPlayer from '../../components/PlaylistDetail/MusicPlayer';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import Loading from '../../components/Loading/Loading';
import Information from '../../components/PlaylistDetail/PlaylistInfo/PlaylistInfo';
import ArrowIcon from '../../img/left-arrow-Icon.svg';
import MoreIcon from '../../img/more-icon.svg';
import * as S from './PlaylistDetailStyle';

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
  const [miniModalOpen, setMiniModalOpen] = useState(false);
  const setEditId = useSetRecoilState(commentEditIdAtom);
  const setPlaylistInfo = useSetRecoilState(PlayListAtom);
  const setBackAnimation = useSetRecoilState(backAnimationAtom);
  const queryClient = useQueryClient();
  const { mutate: deletePlaylist } = useDeletePlaylist();
  const handleMoveBackBtnClick = () => {
    navigate(-1);
  };
  const toggleModal = () => {
    if (miniModalOpen === false) setMiniModalOpen(true);
    else setMiniModalOpen(false);
  };
  const handleDeleteBtnClick = () => {
    const id = playlist.id;
    deletePlaylist(id, {
      onSuccess: () => {
        queryClient.removeQueries('get-playlist-detail');
        alert('플레이리스트가 정상적으로 삭제되었습니다.');
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    setEditId(null);
  }, []);

  useEffect(() => {
    if (!data || isLoading) return;
    const { playlist, music, user } = data;
    setPlaylistInfo({ playlist, music, user });
    console.log(data);
    setBackAnimation(false);
  }, [data, isLoading, setPlaylistInfo]);

  if (!data || isLoading) return <Loading isLoading={isLoading} />;
  if (isError) {
    navigate('/*');
  }
  const { playlist, comments, music, user } = data;
  const musicList = music.map((obj: IMusic) => obj.information);
  const musicLength = music.length;

  return (
    <>
      <S.PlaylistDetailWrap>
        <h1 className='a11y-hidden'>플레이리스트 상세 페이지</h1>
        <S.MoveBackBtn onClick={handleMoveBackBtnClick}>
          <img src={ArrowIcon} alt='뒤로가기' />
        </S.MoveBackBtn>
        <S.MoreBtnBox>
          {user?.id === myId && (
            <button onClick={toggleModal}>
              <img src={MoreIcon} alt='더보기 버튼' />
            </button>
          )}
          {user?.id === myId && miniModalOpen && (
            <S.MiniModalStyle>
              <button onClick={handleDeleteBtnClick}>플리 삭제</button>
              <Link
                to={`/playlist/detail/${playlist?.id}/edit`}
                state={{ id: playlist?.id }}
              >
                플리 수정
              </Link>
            </S.MiniModalStyle>
          )}
        </S.MoreBtnBox>
        <Information>
          <Information.Thumbnail playing={playing} />
          <Information.InfoBox>
            <Information.Title />
            <Information.Writer />
            <Information.Desc />
            <Information.PrivateIndicator />
            <Information.MoreInfoBtn />
          </Information.InfoBox>
        </Information>
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
        <S.PlayListDetailBox>
          {musicLength === 0 ? (
            <S.MusicNothingSection>
              <p>들을 수 있는 노래가 없어요 🥲</p>
              {myId === user.id && (
                <>
                  <span>노래를 추가해보세요! 🎵</span>
                  <Link to='/randomplay'>음악 추가하러 가기</Link>
                </>
              )}
            </S.MusicNothingSection>
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
        </S.PlayListDetailBox>
      </S.PlaylistDetailWrap>
    </>
  );
}
