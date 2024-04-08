import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowUserList from '../../components/Profile/FollowUserList';
import leftArrowIcon from '../../img/left-arrow-Icon.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';
import { userInfoAtom } from '../../library/atom';
import { useRecoilValue } from 'recoil';
import useFollowUser from '../../hooks/queries/useFollow';
import BGImg from '../../img/background-img2.svg';

interface IUserData {
  id: number;
  nickname: string;
  profile_image: string;
  is_following: boolean;
}

export default function Follow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams() as { id: string };
  const myId = useRecoilValue(userInfoAtom).id;

  const [activeList, setActiveList] = useState<'followers' | 'followings'>(
    'followers',
  );
  const [users, setUsers] = useState<IUserData[]>([]);
  const { data: followers } = useGetFollower(parseInt(id) || myId);
  const { data: followings } = useGetFollowing(parseInt(id) || myId);

  useEffect(() => {
    if (
      location.state?.type === 'followers' ||
      location.state?.type === 'followings'
    ) {
      setActiveList(location.state.type);
    }
  }, [location.state]);

  const { followUser } = useFollowUser();

  const handleFollowClick = (user: IUserData) => {
    const isUnfollowing = user.is_following;
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

  const renderUserList = (
    data: IUserData[],
    onFollowClick: (user: IUserData) => void,
  ) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p id='FollowNone'>앗! 아직 비어있어요</p>;
    }
    return <FollowUserList users={data} onFollowClick={onFollowClick} />;
  };

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
        renderUserList(followers, handleFollowClick)}
      {activeList === 'followings' &&
        renderUserList(followings, handleFollowClick)}
    </FollowWrap>
  );
}

// 스타일드 컴포넌트 정의들
const FollowWrap = styled.div`
  width: 100%;
  max-width: 430px;
  min-width: 360px;
  margin: 0 auto;
  height: 100%;
  background: url(${BGImg}) top left / cover no-repeat;

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
  flex-grow: 1;
`;

const ListToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  border-color: ${(props) => (props.active ? '#7d4fff' : 'transparent')};
  color: ${(props) => (props.active ? '#7d4fff' : 'black')};
  margin-right: 4px;
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
