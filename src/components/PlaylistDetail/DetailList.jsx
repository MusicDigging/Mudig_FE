import { useState } from 'react';
import styled from 'styled-components';

import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';

import PlayingIcon from '../../img/playing-icon.svg';
import TestImg from '../../img/thumbnail-img.svg';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

export default function DetailList(props) {
  const { setPause, playing, setPlaying, music, currMusic, setCurrMusic } =
    props;
  const [more, setMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  const handleMore = () => {
    if (!more) {
      if (visibleCount < music.length) setVisibleCount(visibleCount + 10);
      if (visibleCount + 10 >= music.length) {
        setVisibleCount(music.length);
        setMore(!more);
      }
    } else {
      setVisibleCount(2);
      setMore(!more);
    }
  };

  const handlePlayListBtnClick = (index) => {
    if (!playing) setPlaying(!playing);
    setCurrMusic(index);
    setPause(false);
  };

  return (
    <DetailListWrap>
      <PlayList>
        {music.map((item, index) => (
          <PlayListBtn
            key={item.id}
            value={item.information}
            onClick={() => handlePlayListBtnClick(index)}
            bgColor={index === currMusic ? 'rgba(137, 105, 255, 0.08)' : ''}
            display={index + 1 > visibleCount ? 'none' : 'block'}
          >
            <PlayListItem
              img={item.thumbnail}
              title={item.song}
              info={item.singer}
            >
              {index === currMusic && (
                <button>
                  <img src={PlayingIcon} alt='재생중' />
                </button>
              )}
            </PlayListItem>
          </PlayListBtn>
        ))}
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
`;

const PlayListBtn = styled.button`
  width: 100%;
  padding: 0 16px;
  background-color: ${(props) => props.bgColor};
  display: ${(props) => props.display};
`;
const ExtendBtn = styled.button`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;
