import React from 'react';
import styled from 'styled-components';
import User from '../common/User';
import { usePostFollow, useDelFollow } from '../../hooks/queries/useFollow';

const FollowUserList = ({ users }) => {
  const { mutate: postFollow } = usePostFollow();
  const { mutate: delFollow } = useDelFollow();

  const handleFollowClick = async (user) => {
    const mutationFn = user.isFollowing ? delFollow : postFollow;
    mutationFn(user.id, {
      onSuccess: () => {
        // 성공 시의 로직: 예를 들어, 사용자 목록을 다시 가져오거나 상태 업데이트
      },
      onError: (error) => {
        // 에러 처리 로직
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
          user={userData.user}
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
