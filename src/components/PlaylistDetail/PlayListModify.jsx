import styled from 'styled-components';
import PlayListItem from '../common/PlayList/PlayListItem';
import TestImg from '../../img/thumbnail-img.svg';
import PlayList from '../common/PlayList/PlayList';
import CloseIcon from '../../img/close-icon.svg';
import { useState, useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { PlayListAtom } from '../../library/atom';

export default function PlayListModify(props) {
  // const { music } = props;
  const [playlistInfo, setPlayListInfo] = useRecoilState(PlayListAtom);
  // const [playlist, setPlaylist] = useState(playlistInfo.playlist);
  const [music, setMusic] = useState(playlistInfo.music || []);
  console.log('Modify PlaylistInfo: ', playlistInfo);
  // Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }) => {
    console.log('>>> source', source);
    console.log('>>> destination', destination);
    if (!destination) return;
    const _items = JSON.parse(JSON.stringify(music));
    const [targetItem] = _items.splice(source.index, 1);
    _items.splice(destination.index, 0, targetItem);
    setMusic(_items);
  };

  // requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  // requestAnimation 초기화 끝

  return (
    <PlayListModifyWrap>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <PlayList
              innerRef={provided.innerRef}
              droppableProps={provided.droppableProps}
            >
              {music.map((item, index) => (
                <Draggable
                  draggableId={`item-${index}`}
                  index={index}
                  key={index}
                  disableInteractiveElementBlocking
                >
                  {(provided) => (
                    <PlayListItem
                      innerRef={provided.innerRef}
                      dragHandleProps={provided.dragHandleProps}
                      draggableProps={provided.draggableProps}
                      modify={true}
                      img={item.thumbnail}
                      title={item.song}
                      info={item.singer}
                    >
                      <button>
                        <img src={CloseIcon} alt='삭제' />
                      </button>
                    </PlayListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </PlayList>
          )}
        </Droppable>
      </DragDropContext>
    </PlayListModifyWrap>
  );
}

const PlayListModifyWrap = styled.div`
  padding: 25px 16px;
`;
