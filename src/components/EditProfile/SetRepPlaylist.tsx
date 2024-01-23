import React, { useState } from 'react';
import styled from 'styled-components';

import { Image } from '../common/Image/Image';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

interface Playlist {
  id: number;
  thumbnail: string;
  title: string;
}

interface Props {
  publicPlaylist: Playlist[];
  repPlaylist: number | null;
  setRepPlaylist: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function SetRepPlaylist(props: Props) {
  const { publicPlaylist, repPlaylist, setRepPlaylist } = props;

  const [isPlaylistShowed, setisPlaylistShowed] = useState(false);
  const [currRepPlaylist, setCurrRepPlaylist] = useState<Playlist | undefined>(
    publicPlaylist?.find((obj) => obj.id === repPlaylist),
  );

  const handlePrivateView = () => {
    setisPlaylistShowed(!isPlaylistShowed);
  };
  const handleRepPlaylistCheck = (id: number) => {
    const data = publicPlaylist.find((obj) => obj.id === id);

    setRepPlaylist(id);
    setCurrRepPlaylist(data);
    setisPlaylistShowed(!isPlaylistShowed);
  };

  return (
    <SetRepPlaylistWrap>
      <label>대표 플레이리스트</label>
      <SetRepPlaylistBox>
        <CurrRepPlaylist
          type='button'
          onClick={handlePrivateView}
          className={isPlaylistShowed ? 'active' : ''}
          disabled={publicPlaylist.length === 0}
        >
          {repPlaylist || currRepPlaylist ? (
            <>
              <Image src={currRepPlaylist?.thumbnail} />
              <div>
                <strong>{currRepPlaylist?.title}</strong>
              </div>
            </>
          ) : publicPlaylist.length === 0 ? (
            <>플레이리스트 생성 및 공개 설정 후 설정 가능합니다.</>
          ) : (
            <>대표 플레이리스트를 설정해보세요!</>
          )}
          {publicPlaylist.length > 0 && <ArrowIcon fill='black' />}
        </CurrRepPlaylist>
        {isPlaylistShowed && publicPlaylist && (
          <SetRepPlaylistList>
            {publicPlaylist.map((item) => (
              <li key={item?.id}>
                <SetRepPlaylistBtn
                  type='button'
                  onClick={() => handleRepPlaylistCheck(item?.id)}
                >
                  <>
                    <Image src={item?.thumbnail} />
                    <div>
                      <strong>{item?.title}</strong>
                    </div>
                  </>
                </SetRepPlaylistBtn>
              </li>
            ))}
          </SetRepPlaylistList>
        )}
      </SetRepPlaylistBox>
    </SetRepPlaylistWrap>
  );
}

const SetRepPlaylistWrap = styled.div`
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
  overflow: hidden;
  margin-top: 8px;
  max-height: 230px;
  display: flex;
  flex-direction: column;

  box-sizing: content-box;
  border-radius: 10px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);
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
  display: flex;
  gap: 12px;
  align-items: center;

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
    margin-left: auto;
    transform: rotate(90deg);
  }
  &:active,
  &.active {
    svg {
      transform: rotate(270deg);
    }
  }

  &.active {
    border-bottom: 1px solid var(--border-color);
  }
  &:hover {
    color: var(--main-color);
    div {
      color: var(--main-color);
    }
    svg {
      filter: invert(34%) sepia(61%) saturate(4117%) hue-rotate(239deg)
        brightness(99%) contrast(106%);
    }
  }
`;

const CurrRepPlaylist = styled(SetRepPlaylistBtn)`
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid transparent;
`;
