import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MiniModal, { MiniModalWrap } from '../common/Modal/MiniModal';
import ProfileImage from '../common/Image/ProfileImage';

import BackBtnIcon from '../../img/left-arrow-Icon.svg';
import MoreBtnIcon from '../../img/more-icon.svg';
export default function ProfileSection(props) {
  const { btnType } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMoreBtnClick = () => {
    return isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const handleFollowBtnClick = (e) => {
    const { value } = e.target;
    navigate(value);
  };

  const handleLogoutBtnClick = (e) => {};

  return (
    <ProfileSectionWrap>
      <ProfileNavBtn>
        <button>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
        <div>
          <button onClick={handleMoreBtnClick}>
            <img src={MoreBtnIcon} alt='' />
          </button>
          {isModalOpen && (
            <MiniModalStyle>
              <button onClick={handleLogoutBtnClick}>로그아웃</button>
              <Link to='user/profile/edit/password'>비밀번호 변경</Link>
              <Link to='user/profile/edit/password'>회원 탈퇴</Link>
            </MiniModalStyle>
          )}
        </div>
      </ProfileNavBtn>
      <UserInfoBox>
        <ProfileInfo>
          <ProfileImage src='https://picsum.photos/200' />
          <strong>하리보</strong>
        </ProfileInfo>
        <UserInfo>
          <FollowInfo>
            <MoveFollowBtn to='/user/followings'>
              <strong>112</strong>
              <p>팔로잉</p>
            </MoveFollowBtn>
            <MoveFollowBtn value='/user/follower'>
              <strong>97</strong>
              <p>팔로잉</p>
            </MoveFollowBtn>
          </FollowInfo>
          {btnType === 'follow' && (
            <FollowBtn onClick={handleFollowBtnClick}>팔로우</FollowBtn>
          )}
          {btnType === 'edit' && (
            <MoveEditBtn to='/user/profile/edit'>프로필 수정</MoveEditBtn>
          )}
        </UserInfo>
      </UserInfoBox>
      <UserDesc>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
      </UserDesc>
    </ProfileSectionWrap>
  );
}

const ProfileSectionWrap = styled.section`
  padding: 22px 16px 12px;
  font-size: var(--font-md);
  background-color: #fff;
  border-radius: 0 0 8px 8px;

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
`;

const MoveEditBtn = styled(Link)`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 4px 25px;
  border-radius: 10px;
  background-color: #f1f1f5;
`;
