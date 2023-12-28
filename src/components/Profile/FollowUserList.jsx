import React, { useState } from 'react';
import styled from 'styled-components';
import User from '../common/User';
import useFollowUser from '../../hooks/queries/useFollow';

const FollowUserList = ({ users: initialUsers, onRefresh }) => {
  const [users, setUsers] = useState(initialUsers);
  const { followUser } = useFollowUser(); // 커스텀 훅 사용

  const handleFollowClick = (user) => {
    const isUnfollowing = user.isFollowing;
    followUser(user.id, isUnfollowing, {
      onSuccess: () => {
        // 성공적으로 상태 변경 후 사용자 목록 업데이트
        if (isUnfollowing) {
          // 언팔로우하는 경우: 사용자를 목록에서 제거
          setUsers((currentUsers) =>
            currentUsers.filter((u) => u.id !== user.id),
          );
        } else {
          // 팔로우하는 경우: 사용자의 isFollowing 상태를 업데이트
          setUsers((currentUsers) =>
            currentUsers.map((u) =>
              u.id === user.id ? { ...u, isFollowing: true } : u,
            ),
          );
        }

        // 필요하다면 여기서 onRefresh를 호출하여 외부 데이터도 새로고침 할 수 있습니다.
        if (onRefresh) onRefresh();
      },
      onError: (error) => {
        console.error('Follow action failed:', error);
      },
    });
  };

  if (!users || users.length === 0) {
    return <div>사용자가 없습니다.</div>;
  }

  return (
    <FollowUserListWrap>
      {users.map((userData) => (
        <User
          key={userData.id}
          user={userData.id}
          name={userData.name}
          profilePicture={userData.profilePicture}
          isFollowing={userData.isFollowing}
          onFollowClick={() => handleFollowClick(userData)}
        />
      ))}
    </FollowUserListWrap>
  );
};

export default FollowUserList;

const FollowUserListWrap = styled.div`
  padding: 20px;
`;
