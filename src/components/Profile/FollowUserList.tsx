import React, { useState } from 'react';
import styled from 'styled-components';
import User from '../common/User';

interface UserDataType {
  id: number;
  nickname: string;
  profile_image: string;
  is_following: boolean;
}

interface FollowUserListProps {
  users: UserDataType[];
  onFollowClick: (user: UserDataType) => void; // 함수 타입 정의
}

const FollowUserList: React.FC<FollowUserListProps> = ({
  users,
  onFollowClick,
}) => {
  if (!users || users.length === 0) {
    return <div>사용자가 없습니다.</div>;
  }

  return (
    <FollowUserListWrap>
      {users.map((userData) => (
        <User
          key={userData.id}
          user={userData.id}
          name={userData.nickname}
          profilePicture={userData.profile_image}
          isFollowing={userData.is_following}
          onFollowClick={() => onFollowClick(userData)}
        />
      ))}
    </FollowUserListWrap>
  );
};

export default FollowUserList;

const FollowUserListWrap = styled.div`
  padding: 20px;
`;
