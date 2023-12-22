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

export default function Follow() {
  const navigate = useNavigate();
  const location = useLocation();
  const UserId = useRecoilValue(userInfoAtom).id;
  const [activeList, setActiveList] = useState('followers');
  const [refreshData, setRefreshData] = useState(false);

  const {
    data: followers,
    isLoading: followingLoading,
    refetch: refetchFollowers,
  } = useGetFollower(UserId);
  const {
    data: followings,
    isLoading: followerLoading,
    refetch: refetchFollowings,
  } = useGetFollowing(UserId);

  useEffect(() => {
    const shouldRefetch = refreshData || location.state?.type;
    if (shouldRefetch) {
      refetchFollowers();
      refetchFollowings();
      setRefreshData(false);
    }

    if (
      location.state?.type === 'followers' ||
      location.state?.type === 'followings'
    ) {
      setActiveList(location.state.type);
    }
  }, [
    refreshData,
    location.state,
    refetchFollowers,
    refetchFollowings,
    UserId,
  ]);

  const handleFollowClick = (userData) => {
    setRefreshData(true);
  };

  const renderUserList = (data, listType) => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <p>
          {listType === 'followers'
            ? '팔로워가 없습니다.'
            : '팔로잉이 없습니다.'}
        </p>
      );
    }
    return (
      <FollowUserList users={data.map(transformUserData)} listType={listType} />
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
      {activeList === 'followers' && renderUserList(followers, 'followers')}
      {activeList === 'followings' && renderUserList(followings, 'followings')}
    </FollowWrap>
  );
}

// 스타일드 컴포넌트 정의들
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
