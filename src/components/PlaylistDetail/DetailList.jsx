import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';
import TestImg from '../../img/thumbnail-img.svg';
import ExtendIcon from '../../img/arrow-icon.svg';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';
import styled from 'styled-components';
import { useState } from 'react';

export default function DetailList() {
  // const [playlist, setPlaylist] = useState([]);
  const [more, setMore] = useState(false);
  /**
   * 맨 처음에는 2개의 플리만 보여주고
   * 더보기 버튼을 누르면 10개씩 추가로 보여준다.
   * 마지막 플리까지 보여줬다면 화살표의 방향을 바꿔준다.
   * 해당 버튼을 누르면 다시 처음의 2개의 플리만 보여준다.
   */
  const handleMore = () => {
    setMore(!more);
  };
  return (
    <DetailListWrap>
      <PlayList>
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
        {more && (
          <>
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
            <PlayListItem img={TestImg} title='ETA' info='NewJeans · 2:32' />
          </>
        )}
      </PlayList>
      <ExtendBtn onClick={handleMore} more={more}>
        <ArrowIcon fill='black' />
      </ExtendBtn>
    </DetailListWrap>
  );
}
const DetailListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;
const ExtendBtn = styled.button`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;
