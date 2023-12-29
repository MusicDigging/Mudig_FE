import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInfoAtom } from '../../library/atom';
import { useLogout } from '../../hooks/queries/useProfile';

import { isLoginAtom } from '../../library/atom';

import ProfileImage from '../common/Image/ProfileImage';
import useFollowUser from '../../hooks/queries/useFollow';
import MiniModal, { MiniModalWrap } from '../common/Modal/MiniModal';

import MoreBtnIcon from '../../img/more-icon.svg';
import BackBtnIcon from '../../img/left-arrow-Icon.svg';

export default function ProfileSection(props) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const navigate = useNavigate();
  const { isMyProfile } = props;
  const data = props.data;
  const { follower, following, profile, playlist } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { followUser } = useFollowUser();
  const handleMoreBtnClick = () => {
    return isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const handleFollowClick = (e) => {
    e.preventDefault();
    const followState = profile.is_following; // 현재 팔로우 상태

    followUser(profile.id, followState, {
      onSuccess: () => {
        // 팔로우 상태 업데이트
        setUserInfo((prevUserInfo) => {
          // 새로운 프로필 객체 생성하여 불변성 유지
          const newProfile = {
            ...prevUserInfo.profile,
            is_following: !followState, // 팔로우 상태 토글
          };

          // 새로운 userInfo 객체 반환
          return {
            ...prevUserInfo,
            profile: newProfile,
          };
        });
      },
      onError: (error) => {
        console.error('Follow action failed:', error);
        // 사용자에게 오류 메시지를 보여주는 로직을 추가할 수 있습니다.
      },
    });
  };

  const setIsLogin = useSetRecoilState(isLoginAtom);

  const handleLogoutBtnClick = (e) => {
    logout(undefined, {
      onSuccess: (res) => {
        alert('로그아웃 되었습니다.');
        setUserInfo({});
        setIsLogin(false); // 로그인 상태를 false로 설정합니다.
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/'); // 홈으로 리다이렉트
      },
    });
  };

  return (
    <ProfileSectionWrap>
      <ProfileNavBtn>
        <button onClick={() => navigate(-1)}>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
        {isMyProfile && (
          <div>
            <button onClick={handleMoreBtnClick}>
              <img src={MoreBtnIcon} alt='' />
            </button>
            {isModalOpen && (
              <MiniModalStyle>
                <button onClick={handleLogoutBtnClick}>로그아웃</button>
                <Link to='/user/password'>비밀번호 변경</Link>
                <Link to='/user/resign'>회원 탈퇴</Link>
              </MiniModalStyle>
            )}
          </div>
        )}
      </ProfileNavBtn>
      <UserInfoBox>
        <ProfileInfo>
          <ProfileImage src={profile?.image} />
          <strong>{profile?.name}</strong>
        </ProfileInfo>
        <UserInfo>
          <FollowInfo>
            <MoveFollowBtn
              to='/user/profile/my/follow'
              state={{ type: 'followers', following, follower }}
            >
              <strong>{follower?.length}</strong>
              <p>팔로워</p>
            </MoveFollowBtn>
            <MoveFollowBtn
              to='/user/profile/my/follow'
              state={{ type: 'followings', following, follower }}
            >
              <strong>{following?.length}</strong>
              <p>팔로잉</p>
            </MoveFollowBtn>
          </FollowInfo>
          {!isMyProfile && (
            <FollowBtn
              type='button'
              onClick={handleFollowClick}
              isFollowing={profile.is_following}
            >
              {profile.is_following ? '언팔로우' : '팔로우'}
            </FollowBtn>
          )}
          {isMyProfile && (
            <MoveEditBtn to='/user/profile/edit' state={{ profile, playlist }}>
              프로필 수정
            </MoveEditBtn>
          )}
        </UserInfo>
      </UserInfoBox>
      <UserDesc>{profile?.about}</UserDesc>
    </ProfileSectionWrap>
  );
}

const ProfileSectionWrap = styled.section`
  padding: 22px 16px 12px;
  font-size: var(--font-md);
  background-color: #fff;
  border-radius: 0 0 8px 8px;
  filter: drop-shadow(0px 2px 24px rgba(125, 79, 255, 0.1));
  strong {
    font-weight: var(--font-semi-bold);
  }
`;

const ProfileNavBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfoBox = styled.div`
  width: 100%;
  padding: 18px 0;
  justify-content: center;
  display: flex;
  gap: 52px;
  border-bottom: 1px solid var(--border-color);
  strong {
    font-size: var(--font-lg);
  }
`;

const MiniModalStyle = styled(MiniModalWrap)`
  right: 16px;
`;

const UserDesc = styled.p`
  padding: 16px 8px;
  line-height: 150%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FollowInfo = styled.div`
  height: 64px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 18px;
`;
const MoveFollowBtn = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  p {
    font-size: var(--font-sm);
    color: var(--extra-font-color);
  }
`;

const FollowBtn = styled.button`
  height: 34px;
  padding: 4px 25px;
  border-radius: 10px;
  color: #fff;
  background-color: var(--btn-background-color);
  ${({ is_following }) =>
    is_following &&
    `
  background-color: #ffffff;
  color: #7d4fff;
  border: 1px solid #7d4fff;
`}
`;

const MoveEditBtn = styled(Link)`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 4px 25px;
  border-radius: 10px;
  background-color: #f1f1f5;
`;
