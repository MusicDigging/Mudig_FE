import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
import { Button } from '../../components/common/Button/Button';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import Loading from '../../components/Loading/Loading';
import { IMusic } from '../../types/playlist';
import Information from '../../components/PlaylistDetail/PlaylistInfo/PlaylistInfo';
import { PlayListAtom } from '../../library/atom';
import { useSetRecoilState } from 'recoil';

export default function PlaylistSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const playlistId = state?.playlist; // 플리 요약 수정 시 id값 임의로 주기
  const { data, isLoading } = useGetPlaylistDetail(playlistId);
  const setPlaylistInfo = useSetRecoilState(PlayListAtom);
  if (isLoading) return <Loading isLoading={isLoading} />;

  const { user, playlist, music } = data;
  setPlaylistInfo({ user, playlist, music });

  const handleNextBtn = () => {
    navigate('/user/profile/my');
  };

  return (
    <main>
      <Information>
        <Information.SummaryTitle />
        <Information.Thumbnail />
        <Information.InfoBox>
          <Information.Desc />
          <Information.PrivateIndicator />
          <Information.MoreInfoBtn />
        </Information.InfoBox>
      </Information>
      <PlayListBox>
        <PlayList>
          {music.map((item: IMusic) => (
            <li key={item.id}>
              <PlayListItem
                img={item.thumbnail}
                title={item.song}
                info={item.singer}
              />
            </li>
          ))}
        </PlayList>
      </PlayListBox>
      <BlurBox />
      <BtnBox>
        <Button onClick={handleNextBtn} text='확인' btnWidth='100%' />
      </BtnBox>
    </main>
  );
}
const PlayListBox = styled.section`
  background: #fff;
  padding: 10px 16px 70px;
  height: calc(100vh - 472px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const BlurBox = styled.div`
  position: absolute;
  bottom: 89px;
  width: 100%;
  height: 170px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  z-index: 5;
`;
const BtnBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 10;
  bottom: 99px;
  padding: 10px 16px;
`;
