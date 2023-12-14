import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
import TestImg from '../../img/thumbnail-img.svg';
export default function PlaylistSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.playlist;
  const { data, isLoading } = useGetPlaylistDetail(playlistId);
  if (isLoading) return;

  const { playlist, music } = data;
  const handleNextBtn = () => {
    navigate(`/playlist/detail/${playlistId}`, {
      state: { playlistId: playlistId },
    });
  };
  return (
    <PlaylistSummaryWrap>
      <PlayListInfo playlist={playlist} />
      <PlayListBox>
        <PlayList>
          {music.map((item, index) => (
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
      <NextBtn onClick={handleNextBtn}>확인</NextBtn>
    </PlaylistSummaryWrap>
  );
}
const PlaylistSummaryWrap = styled.div`
  position: relative;
`;
const PlayListBox = styled.div`
  margin-top: 12px;
  padding: 0 16px;
`;
const BlurBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 360px;
  height: 170px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  z-index: 5;
`;
const NextBtn = styled.button`
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 15.5px;
  transform: translate(0%, 50%);
  width: 328px;
  padding: 12px 0;
  background-color: var(--playlist-info-bg-color);
  color: #fff;
  border-radius: 10px;
  font-size: var(--font-md);
  line-height: normal;
`;
