import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { PlayListAtom, toastAtom } from '../../library/atom';
import { useModifyPlaylist } from '../../hooks/queries/usePlaylist';
import PlayListItem from '../common/PlayList/PlayListItem';
import PlayList from '../common/PlayList/PlayList';
import CloseIcon from '../../img/close-icon.svg';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { IPlaylistDesc } from '../../types/playlist';

interface Props {
  playlistDesc: IPlaylistDesc;
}

export default function PlayListModifyList({ playlistDesc }: Props) {
  const navigate = useNavigate();
  const playlistInfo = useRecoilValue(PlayListAtom);
  const [music, setMusic] = useState(playlistInfo.music || []);
  const { mutate: modifyPlaylist } = useModifyPlaylist(
    playlistInfo.playlist.id,
  );
  const [delMusic, setDelMusic] = useState<number[]>([]);
  const [changedOrder, setChangedOrder] = useState([]);
  const setToast = useSetRecoilState(toastAtom);

  // 음악 삭제 handler
  const handleDelBtn = (itemId: number) => {
    const newMusic = music.filter((item) => item.id !== itemId);
    setMusic(newMusic);
    const newOrder = changedOrder.filter((item) => item !== itemId);
    setChangedOrder(newOrder);
    setDelMusic([...delMusic, itemId]);
  };
  // 수정하기
  const handleModifyClick = (e: React.MouseEvent) => {
    const reqData = {
      del_music_list: delMusic.join(','),
      move_music: changedOrder.join(','),
      title: playlistDesc.title,
      content: playlistDesc.content,
      is_public: playlistDesc.is_public,
    };
    modifyPlaylist(reqData, {
      onSuccess: () => {
        setToast({ content: '수정에 성공하였습니다.', type: 'success' });
        navigate(-1);
      },
      onError: () => {
        setToast({ content: '수정에 실패하였습니다.', type: 'warning' });
      },
    });
  };

  // Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const items = JSON.parse(JSON.stringify(music));
    const [targetItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, targetItem);
    setMusic(items);
    const newOrder = items.map((item: { id: number }) => item.id);
    setChangedOrder(newOrder);
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
                  draggableId={`${item.id}`}
                  index={index}
                  key={item.id}
                  disableInteractiveElementBlocking
                >
                  {(provided) => (
                    <li>
                      <PlayListItem
                        innerRef={provided.innerRef}
                        dragHandleProps={provided.dragHandleProps}
                        draggableProps={provided.draggableProps}
                        modify={true}
                        img={item.thumbnail}
                        title={item.song}
                        info={item.singer}
                      >
                        <DelBtn
                          type='button'
                          name='삭제'
                          onClick={() => handleDelBtn(item.id)}
                        >
                          <img src={CloseIcon} alt='삭제' />
                        </DelBtn>
                      </PlayListItem>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </PlayList>
          )}
        </Droppable>
      </DragDropContext>
      <SaveBtn onClick={handleModifyClick}>저장</SaveBtn>
    </PlayListModifyWrap>
  );
}

const PlayListModifyWrap = styled.div`
  flex: 1 0 0;
  padding: 25px 16px;
  background-color: #fff;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SaveBtn = styled.button`
  position: absolute;
  top: 13px;
  right: 16px;
  width: 44px;
  height: 44px;
  font-size: var(--font-md);
  color: #fff;
`;

const DelBtn = styled.button`
  margin-left: -7px;
`;
