import { useState } from 'react';
import styled from 'styled-components';

import MusicWave from './MusicWave';
import { Music } from '../../types/playlist';
import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';

import PlayingIcon from '../../img/playing-icon.svg';
import TestImg from '../../img/thumbnail-img.svg';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

interface Props {
  pause: boolean;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  music: Music[];
  currMusic: number | null;
  setCurrMusic: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function DetailList(props: Props) {
  const {
    pause,
    setPause,
    playing,
    setPlaying,
    music,
    currMusic,
    setCurrMusic,
  } = props;
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

  const handlePlayListBtnClick = (index: number) => {
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
            display={index + 1 > visibleCount ? 'none' : 'block'}
            $bgColor={index === currMusic ? 'rgba(137, 105, 255, 0.08)' : ''}
          >
            <PlayListItem
              img={item.thumbnail}
              title={item.song}
              info={item.singer}
            >
              {index === currMusic && !pause && <MusicWave />}
            </PlayListItem>
          </PlayListBtn>
        ))}
      </PlayList>
      {music.length > 2 && (
        <ExtendBtn onClick={handleMore} more={more}>
          <ArrowIcon fill='black' />
        </ExtendBtn>
      )}
    </DetailListWrap>
  );
}
const DetailListWrap = styled.div`
  display: flex;
  padding-bottom: 8px;
  flex-direction: column;
  background-color: #fff;
`;

const PlayListBtn = styled.button<{ display: string; $bgColor: string }>`
  width: 100%;
  padding: 0 16px;
  background-color: ${(props) => props.$bgColor};
  display: ${(props) => props.display};
`;
const ExtendBtn = styled.button<{ more: boolean }>`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;
