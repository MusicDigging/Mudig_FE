import React, { useState } from 'react';
import styled from 'styled-components';
import User from '../common/User';
import { usePostFollow, useDelFollow } from '../../hooks/queries/useFollow';

const FollowUserList = ({ users: initialUsers, onRefresh }) => {
  const [users, setUsers] = useState(initialUsers);
  const { mutate: postFollow } = usePostFollow();
  const { mutate: delFollow } = useDelFollow();

  const handleFollowClick = async (user) => {
    const isUnfollowing = user.isFollowing;
    const mutationFn = isUnfollowing ? delFollow : postFollow;

    mutationFn(user.id, {
      onSuccess: () => {
        setUsers((currentUsers) =>
          currentUsers.map((u) =>
            u.id === user.id ? { ...u, isFollowing: !isUnfollowing } : u,
          ),
        );
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

// 스타일드 컴포넌트
const FollowUserListWrap = styled.div`
  padding: 20px;
`;
