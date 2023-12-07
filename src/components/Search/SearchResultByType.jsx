import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { CircleImage } from '../common/Image/Image';
import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';
import EmptySearch from './EmptySearch';

export default function SearchResultByType(props) {
  const { result, currentNav } = props;
  const [type, setType] = useState('');
  const SearchResultType = () => {
    if (result) {
      if (currentNav.playlist) setType('playlist');
      else if (currentNav.user) setType('user');
    }
  };
  const maskedEmail = (email) => {
    return email.replace(/@.*/, '');
  };
  useEffect(() => {
    SearchResultType();
  }, []);
  return (
    <>
      {/* 플리 결과만 */}
      {type === 'playlist' && (
        <PlayList>
          {result.playlists.length !== 0 ? (
            result.playlists.map((item) => (
              <PlayListItem
                key={item.playlist.id}
                img={item.playlist.thumbnail}
                title={item.playlist.title}
                info={item.writer.name}
              ></PlayListItem>
            ))
          ) : (
            <EmptySearch />
          )}
        </PlayList>
      )}
      {/* 유저 결과만 */}
      {type === 'user' && (
        <UserList>
          {result.users.map((user) => {
            return (
              <UserItem key={user.id}>
                <UserImgBox>
                  <CircleImage src={user.image} alt='유저이미지' />
                </UserImgBox>
                <UserInfoBox>
                  <div>{maskedEmail(user.email)}</div>
                  <p>{user.name}</p>
                </UserInfoBox>
              </UserItem>
            );
          })}
        </UserList>
      )}
    </>
  );
}
const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const UserItem = styled.li`
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    border-radius: 50%;
  }
`;
const UserImgBox = styled.div`
  width: 60px;
  height: 60px;
`;
const UserInfoBox = styled.div`
  font-size: var(--font-md);
  div {
    margin-bottom: 3px;
    line-height: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  p {
    color: var(--sub-font-color);
  }
`;
