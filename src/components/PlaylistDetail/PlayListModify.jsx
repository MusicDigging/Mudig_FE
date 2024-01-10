import styled from 'styled-components';
import PlayListItem from '../common/PlayList/PlayListItem';
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
import { PlayListAtom, toastAtom } from '../../library/atom';
import { useModifyPlaylist } from '../../hooks/queries/usePlaylist';
import { useNavigate } from 'react-router-dom';

export default function PlayListModify({ playlistDesc }) {
  const navigate = useNavigate();
  const [playlistInfo, setPlayListInfo] = useRecoilState(PlayListAtom);
  const [music, setMusic] = useState(playlistInfo.music || []);
  const { mutate: modifyPlaylist } = useModifyPlaylist(
    playlistInfo.playlist.id,
  );
  const [delMusic, setDelMusic] = useState([]);
  const [changedOrder, setChangedOrder] = useState([]);
  const [toast, setToast] = useRecoilState(toastAtom);

  // 음악 삭제 handler
  const handleDelBtn = (itemId) => {
    const newMusic = music.filter((item) => item.id !== itemId);
    setMusic(newMusic);
    const newOrder = changedOrder.filter((item) => item !== itemId);
    setChangedOrder(newOrder);
    setDelMusic([...delMusic, itemId]);
  };
  // 수정하기
  const handleModifyClick = (e) => {
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
      onError: (error) => {
        setToast({ content: '수정에 실패하였습니다.', type: 'warning' });
      },
    });
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const _items = JSON.parse(JSON.stringify(music));
    const [targetItem] = _items.splice(source.index, 1);
    _items.splice(destination.index, 0, targetItem);
    setMusic(_items);
    // 변경된 순서를 저장
    const newOrder = _items.map((item) => item.id);
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
