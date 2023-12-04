import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowUserList from '../../components/Profile/FollowUserList';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';

// 가상의 사용자 데이터 생성
const mockUsers = [
  {
    id: 1,
    user: 'mumu__00',
    name: '뮤뮤',
    profilePicture: 'https://via.placeholder.com/150',
    isFollowing: true,
  },
  {
    id: 2,
    user: 'mumu__00',
    name: '뮤뮤',
    profilePicture: 'https://via.placeholder.com/150',
    isFollowing: false,
  },
  {
    id: 3,
    user: 'mumu__00',
    name: '뮤뮤',
    profilePicture: 'https://via.placeholder.com/150',
    isFollowing: false,
  },
  // ... 추가 사용자 데이터 ...
];

export default function Follow() {
  // 팔로워 목록을 별도로 관리
  const followers = mockUsers.filter((user) => !user.isFollowing);
  // 팔로잉 목록을 별도로 관리
  const following = mockUsers.filter((user) => user.isFollowing);
  // 기본 상태를 'followers'로 설정
  const [activeList, setActiveList] = useState('followers');
  console.log(followers, following);
  return (
    <FollowWrap>
      <BackButton></BackButton>
      <ListToggleButtonWrap>
        <ListToggleButton
          active={activeList === 'followers'}
          onClick={() => setActiveList('followers')}
        >
          팔로워 목록
        </ListToggleButton>
        <ListToggleButton
          active={activeList === 'following'}
          onClick={() => setActiveList('following')}
        >
          팔로잉 목록
        </ListToggleButton>
      </ListToggleButtonWrap>

      {activeList === 'followers' && (
        <FollowUserList users={followers} listType='followers' />
      )}
      {activeList === 'following' && (
        <FollowUserList users={following} listType='following' />
      )}
    </FollowWrap>
  );
}

// 스타일 컴포넌트 정의
const FollowWrap = styled.div`
  width: 360px;
`;
const BackButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 22px 0 19px 22px;
  background-image: url(${leftArrowIcon});
`;
const ListToggleButtonWrap = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 9.5px;
`;

const ListToggleButton = styled.button`
  width: 163px;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  border-color: ${(props) => (props.active ? '#7d4fff' : 'transparent')};
  color: ${(props) => (props.active ? '#7d4fff' : 'black')};
  margin-right: 4px;
  cursor: pointer;
`;
