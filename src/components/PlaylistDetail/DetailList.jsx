import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';
import TestImg from '../../img/thumbnail-img.svg';
import ExtendIcon from '../../img/arrow-icon.svg';
import styled from 'styled-components';
export default function DetailList() {
  return (
    <DetailListWrap>
      <PlayList>
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        {/* <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' /> */}
      </PlayList>
      <ExtendBtn>
        <img src={ExtendIcon} alt='플레이리스트 확장' />
      </ExtendBtn>
    </DetailListWrap>
  );
}
const DetailListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: scroll;
`;
const ExtendBtn = styled.button``;
