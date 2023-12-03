import React from 'react';
import styled from 'styled-components';
import User from '../common/User';

const FollowUserList = ({ users, listType }) => {
  if (!users || users.length === 0) {
    // 데이터가 없거나 로딩 중일 때 표시될 내용
    return <div>사용자가 없습니다.</div>;
  }

  return (
    <FollowUserListWrap>
      {users.map((userData) => (
        <User
          key={userData.id}
          user={userData.user}
          name={userData.name} // Make sure this matches the property name in the data object
          profilePicture={userData.profilePicture}
          isFollowing={userData.isFollowing}
        />
      ))}
    </FollowUserListWrap>
  );
};

export default FollowUserList;

const FollowUserListWrap = styled.div`
  padding: 20px;
`;
