import styled from 'styled-components';
// import Modal from '../../components/common/Modal/Modal';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlaylistPrivateCheck from '../../components/PlaylistSummary/PlaylistPrivateCheck';
import TestImg from '../../img/thumbnail-img.svg';
export default function PlaylistSummary() {
  return (
    <PlaylistSummaryWrap>
      <PlayListInfo></PlayListInfo>
      {/* <Modal title='드라이브할 때 듣기 좋은 K-POP' /> */}
      <PlaylistPrivateCheck />
      <PlayListBox>
        <PlayList>
          <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
          <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
          <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
          <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        </PlayList>
      </PlayListBox>
      <BlurBox />
      <NextBtn>다음</NextBtn>
    </PlaylistSummaryWrap>
  );
}
const PlaylistSummaryWrap = styled.div`
  position: relative;
`;
const PlayListBox = styled.div`
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
