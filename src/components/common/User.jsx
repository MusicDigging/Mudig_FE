import React from 'react';
import styled from 'styled-components';

const User = ({ user, name, profilePicture, isFollowing, onFollowClick }) => {
  console.log(user, name);

  return (
    <UserWrap>
      <ProfilePicture src={profilePicture} alt={`${user}'s profile`} />
      <UserNameBox>
        <UserName>{user}</UserName>
        <UserNickName>{name}</UserNickName>
      </UserNameBox>
      <FollowButton
        isFollowing={isFollowing}
        onClick={onFollowClick} // 팔로우/언팔로우 클릭 이벤트 핸들러 추가
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </FollowButton>
    </UserWrap>
  );
};

export default User;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 16px;
`;
const UserNameBox = styled.div`
  flex-grow: 1;
`;
const UserName = styled.span`
  font-size: 14px;
  color: #262626;
  display: block;
`;
const UserNickName = styled.span`
  font-size: 14px;
  color: #909090;
`;

const FollowButton = styled.button`
  width: 89px;
  padding: 5px 9px;
  border: none;
  border-radius: 5px;
  background-color: #7d4fff;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${({ isFollowing }) =>
    isFollowing &&
    `
    background-color: #ffffff;
    color: #7d4fff;
    border: 1px solid #7d4fff;
  `}
`;
