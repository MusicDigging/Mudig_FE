import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { isLoginAtom } from '../../library/atom';
import { userInfoAtom } from '../../library/atom';
import { ProfileData } from '../../types/profile';
import { useLogout } from '../../hooks/queries/useProfile';

import ProfileImage from '../common/Image/ProfileImage';
import useFollowUser from '../../hooks/queries/useFollow';
import { MiniModalWrap } from '../common/Modal/MiniModal';

import MoreBtnIcon from '../../img/more-icon.svg';
import BackBtnIcon from '../../img/left-arrow-Icon.svg';

interface Props {
  isMyProfile: boolean;
  data: ProfileData;
}

export default function ProfileSection(props: Props) {
  const setUserInfo = useSetRecoilState(userInfoAtom);
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
  const UserId = props.data.UserId;

  const handleFollowClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const followState = profile.is_following; // 현재 팔로우 상태

    followUser(profile.id, followState);
  };

  const followPath = isMyProfile
    ? `/user/profile/my/follow`
    : `/user/profile/${UserId}/follow`;

  const setIsLogin = useSetRecoilState(isLoginAtom);

  const handleLogoutBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    logout(undefined, {
      onSuccess: (res) => {
        alert('로그아웃 되었습니다.');
        setUserInfo({
          id: 0,
          email: '',
          name: '',
          image: '',
          genre: '',
          about: '',
          rep_playlist: null,
          token: {
            access: '',
            refresh: '',
          },
        });
        setIsLogin(false); // 로그인 상태를 false로 설정합니다.
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/'); // 홈으로 리다이렉트
      },
    });
  };

  return (
    <ProfileSectionWrap>
      <h2 className='a11y-hidden'>프로필 정보</h2>
      <ProfileNavBtn>
        <button onClick={() => navigate(-1)}>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
        {isMyProfile && (
          <div>
            <button onClick={handleMoreBtnClick} aria-label='더보기'>
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
              to={followPath}
              state={{ type: 'followers', following, follower }}
            >
              <strong>{follower?.length}</strong>
              <p>팔로워</p>
            </MoveFollowBtn>
            <MoveFollowBtn
              to={followPath}
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
              {profile.is_following ? '팔로우 취소' : '팔로우'}
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
  position: relative;
  display: flex;
  justify-content: space-between;
  button + div {
  }
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
  right: 0px;
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

const FollowBtn = styled.button<{ isFollowing: boolean | null }>`
  font-size: inherit;
  max-width: 100px;
  width: 100%;
  height: 34px;
  padding: 4px 12px;
  border-radius: 10px;
  color: #fff;
  background-color: var(--btn-background-color);
  ${({ isFollowing }) =>
    isFollowing &&
    `
    background-color: #F6F6F6;
    color: #000;
    border: 1px solid #F6F6F6;
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
