import React, { useState } from 'react';
import styled from 'styled-components';
import User from '../common/User';

interface IUserDataType {
  id: number;
  nickname: string;
  profile_image: string;
  is_following: boolean;
}

interface Props {
  users: IUserDataType[];
  onFollowClick: (user: IUserDataType) => void;
}

export default function FollowUserList({ users, onFollowClick }: Props) {
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
}

const FollowUserListWrap = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
  padding-bottom: 130px;
`;
