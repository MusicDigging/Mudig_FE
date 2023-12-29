import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowUserList from '../../components/Profile/FollowUserList';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';
import { userInfoAtom } from '../../library/atom';
import { useRecoilValue } from 'recoil';
import useFollowUser from '../../hooks/queries/useFollow';
export default function Follow() {
  const navigate = useNavigate();
  const location = useLocation();
  const UserId = useRecoilValue(userInfoAtom).id;
  const [activeList, setActiveList] = useState('followers');
  const [refreshData, setRefreshData] = useState(false);
  const [users, setUsers] = useState();
  const { data: followers, isLoading: followingLoading } =
    useGetFollower(UserId);
  const { data: followings, isLoading: followerLoading } =
    useGetFollowing(UserId);

  useEffect(() => {
    const shouldRefetch = refreshData || location.state?.type;
    if (shouldRefetch) {
      setRefreshData(false);
    }

    if (
      location.state?.type === 'followers' ||
      location.state?.type === 'followings'
    ) {
      setActiveList(location.state.type);
    }
  }, [refreshData, location.state, UserId]);

  // const handleFollowClick = async (user) => {
  //   console.log(user);
  // };

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
      },
    });
  };

  const renderUserList = (data, listType, onFollowClick) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p id='FollowNone'>앗! 아직 비어있어요</p>;
    }
    return (
      <FollowUserList
        users={data.map(transformUserData)}
        listType={listType}
        onFollowClick={onFollowClick}
      />
    );
  };

  const transformUserData = (userData) => ({
    id: userData.id,
    user: userData.nickname,
    name: userData.nickname,
    profilePicture: userData.profile_image,
    isFollowing: userData.is_following,
  });

  return (
    <FollowWrap>
      <BackButton onClick={() => navigate(-1)}>
        <img src={leftArrowIcon} alt='Back' />
      </BackButton>
      <ListToggleButtonWrap>
        <ListToggleButton
          active={activeList === 'followers'}
          onClick={() => setActiveList('followers')}
        >
          {followers?.length ?? 0} 팔로워
        </ListToggleButton>
        <ListToggleButton
          active={activeList === 'followings'}
          onClick={() => setActiveList('followings')}
        >
          {followings?.length ?? 0} 팔로잉
        </ListToggleButton>
      </ListToggleButtonWrap>
      {activeList === 'followers' &&
        renderUserList(followers, 'followers', handleFollowClick)}
      {activeList === 'followings' &&
        renderUserList(followings, 'followings', handleFollowClick)}
    </FollowWrap>
  );
}

// 스타일드 컴포넌트 정의들
const FollowWrap = styled.div`
  width: 360px;
  #FollowNone {
    color: #b0b0b0;
    margin-top: 50px;
    text-align: center;
  }
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
