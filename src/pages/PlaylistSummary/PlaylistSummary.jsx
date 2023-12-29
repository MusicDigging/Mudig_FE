import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/common/Button/Button';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
export default function PlaylistSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.playlist; // 플리 요약 수정 시 id값 임의로 주기
  const { data, isLoading } = useGetPlaylistDetail(playlistId);
  if (isLoading) return;

  const { user, playlist, music } = data;

  const handleNextBtn = () => {
    navigate('/user/profile/my');
  };
  return (
    <>
      <PlayListInfo user={user} playlist={playlist} />
      <PlayListBox>
        <PlayList>
          {music.map((item) => (
            <PlayListItem
              key={item.id}
              img={item.thumbnail}
              title={item.song}
              info={item.singer}
            />
          ))}
        </PlayList>
      </PlayListBox>
      <BlurBox />
      <BtnBox>
        <Button onClick={handleNextBtn} text='확인' />
      </BtnBox>
    </>
  );
}
const PlayListBox = styled.div`
  background: #fff;
  padding: 10px 16px 180px;
  height: calc(100vh - 364px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const BlurBox = styled.div`
  position: absolute;
  bottom: 89px;
  width: 360px;
  height: 170px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  z-index: 5;
`;
const BtnBox = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 113px;
  left: 15.5px;
`;
