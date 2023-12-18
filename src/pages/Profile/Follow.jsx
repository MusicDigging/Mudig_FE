import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowUserList from '../../components/Profile/FollowUserList';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Follow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeList, setActiveList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      location.state?.type === 'followers' ||
      location.state?.type === 'followings'
    ) {
      setActiveList(location.state.type);
    } else {
      // 기본값 설정
      setActiveList('followers');
    }
    setIsLoading(false);
  }, [location.state]);

  const renderUserList = (data, listType) => {
    if (!data || data.length === 0) {
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
      <BackButton onClick={() => navigate(-1)}></BackButton>
      <ListToggleButtonWrap>
        <ListToggleButton
          active={activeList === 'followers'}
          onClick={() => setActiveList('followers')}
        >
          {location.state.follower?.length ?? 0} 팔로워
        </ListToggleButton>
        <ListToggleButton
          active={activeList === 'followings'}
          onClick={() => setActiveList('followings')}
        >
          {location.state.following?.length ?? 0} 팔로잉
        </ListToggleButton>
      </ListToggleButtonWrap>
      {activeList === 'followers' &&
        renderUserList(location.state.follower, 'followers')}
      {activeList === 'followings' &&
        renderUserList(location.state.following, 'followings')}
    </FollowWrap>
  );
}

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
