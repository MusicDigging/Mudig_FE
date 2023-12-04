import styled from 'styled-components';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import TestImg from '../../img/thumbnail-img.svg';
export default function PlaylistSummary() {
  return (
    <PlaylistSummaryWrap>
      <PlayListInfo></PlayListInfo>
      <PlayListBox>
        <PlayList>
          <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
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
