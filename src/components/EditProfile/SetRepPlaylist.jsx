import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { modalAtom } from '../../atoms/modalAtom';

import { Image } from '../common/Image/Image';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

export default function SetRepPlaylist(props) {
  const { playlist, repPlaylist, setRepPlaylist } = props;
  const [isPlaylistShowed, setisPlaylistShowed] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const repPlaylistData = playlist.find((obj) => obj.id === repPlaylist);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handlePrivateView = () => {
    setisPlaylistShowed(!isPlaylistShowed);
  };
  const handleRepPlaylistCheck = (e) => {
    setisPlaylistShowed(!isPlaylistShowed);
  };

  console.log(playlist);

  return (
    <SetRepPlaylistWrap>
      <label>대표 플레이리스트</label>
      <SetRepPlaylistBox zIndex={isPlaylistShowed ? '999' : ''}>
        <CurrRepPlaylist
          type='button'
          onClick={handlePrivateView}
          className={isPlaylistShowed ? 'active' : ''}
          bdBottom={isPlaylistShowed}
        >
          <>
            <Image src='https://picsum.photos/200' />
            <div>
              <strong>
                드라이브 플리 시리즈 총모음 | 이거 틀면 운전하다 옆차선에서 제목
                알려 달라한다
              </strong>
            </div>
          </>
          <ArrowIcon fill='black' />
        </CurrRepPlaylist>
        {isPlaylistShowed && (
          <SetRepPlaylistList>
            <li>
              <SetRepPlaylistBtn type='button' onClick={handleRepPlaylistCheck}>
                <>
                  <Image src='https://picsum.photos/200' />
                  <div>
                    <strong>
                      드라이브 플리 시리즈 총모음 | 이거 틀면 운전하다
                      옆차선에서 제목 알려 달라한다
                    </strong>
                  </div>
                </>
              </SetRepPlaylistBtn>
            </li>
            <li>
              <SetRepPlaylistBtn type='button' onClick={handleRepPlaylistCheck}>
                <>
                  <Image src='https://picsum.photos/200' />
                  <div>
                    <strong>
                      드라이브 플리 시리즈 총모음 | 이거 틀면 운전하다
                      옆차선에서 제목 알려 달라한다
                    </strong>
                  </div>
                </>
              </SetRepPlaylistBtn>
            </li>
            <li>
              <SetRepPlaylistBtn type='button' onClick={handleRepPlaylistCheck}>
                <>
                  <Image src='https://picsum.photos/200' />
                  <div>
                    <strong>
                      드라이브 플리 시리즈 총모음 | 이거 틀면 운전하다
                      옆차선에서 제목 알려 달라한다
                    </strong>
                  </div>
                </>
              </SetRepPlaylistBtn>
            </li>
          </SetRepPlaylistList>
        )}
      </SetRepPlaylistBox>
    </SetRepPlaylistWrap>
  );
}

const SetRepPlaylistWrap = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    width: 100%;
    text-align: left;
  }
`;

const SetRepPlaylistBox = styled.div`
  width: 100%;
  box-sizing: content-box;
  overflow: hidden;
  margin-top: 8px;
  border-radius: 10px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;

  max-height: 200px;
`;

const SetRepPlaylistList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SetRepPlaylistBtn = styled.button`
  padding: 7px;
  width: 100%;
  position: relative;
  background-color: white;
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 100;
  img {
    width: 50px;
  }

  div {
    display: -webkit-box;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  svg {
    position: absolute;
    right: 8px;
    transform: rotate(90deg);
  }
  &:active,
  &.active {
    svg {
      transform: rotate(270deg);
    }
  }

  &.active {
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color);
  }
  &:hover {
    div {
      color: var(--main-color);
    }
  }
`;

const CurrRepPlaylist = styled(SetRepPlaylistBtn)`
  border-radius: 10px 10px 0 0;
  padding-right: 32px;
`;
