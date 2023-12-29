import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CircleImage } from '../../components/common/Image/Image';
import { userInfoAtom } from '../../library/atom';

const User = ({ user, name, profilePicture, isFollowing, onFollowClick }) => {
  const myInfo = useRecoilValue(userInfoAtom);

  const handleClick = () => {
    onFollowClick();
    // 여기서 데이터 새로고침 함수 호출
  };
  const myProfile = user === myInfo.id;
  return (
    <UserWrap>
      <Link to={`/user/profile/${user}`}>
        <CircleImage src={profilePicture} alt={`${name}'s profile`} />
        <UserNameBox>
          <UserName>{name}</UserName>
          <UserNickName>{name}</UserNickName>
        </UserNameBox>
      </Link>
      {!myProfile && (
        <FollowButton
          isFollowing={isFollowing}
          onClick={handleClick} // 이벤트 핸들러 변경
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </FollowButton>
      )}
    </UserWrap>
  );
};

export default User;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 16px;
  }
  a {
    display: contents;
  }
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
  font-size: 14px;
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
    background-color: #F6F6F6;
    color: #000;
    border: 1px solid #F6F6F6;
  `}
`;
