import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProfileImage from '../common/Image/ProfileImage';
import { Button } from '../common/Button/Button';

export default function ProfileSection(props) {
  const { btnType } = props;
  // const navigate = useNavigate();

  function handleMoveBtnClick(e) {
    const { value } = e.target;
    // navigate(value);
  }

  return (
    <ProfileSectionWrap>
      <UserInfoBox>
        <UserInfo>
          <ProfileImage />
          <strong>하리보</strong>
        </UserInfo>
        <UserInfo>
          <FollowInfo>
            <MoveFollowBtn value='/user/follow' onClick={handleMoveBtnClick}>
              <strong>112</strong>
              <p>팔로잉</p>
            </MoveFollowBtn>
            <MoveFollowBtn value='/user/follow' onClick={handleMoveBtnClick}>
              <strong>97</strong>
              <p>팔로잉</p>
            </MoveFollowBtn>
          </FollowInfo>
          {btnType === 'follow' && <FollowBtn>팔로우</FollowBtn>}
          {btnType === 'edit' && (
            <MoveEditBtn
              value='/user/profile/edit'
              onClick={handleMoveBtnClick}
            >
              프로필 수정
            </MoveEditBtn>
          )}
        </UserInfo>
      </UserInfoBox>
      <UserDescBox>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
      </UserDescBox>
    </ProfileSectionWrap>
  );
}

const ProfileSectionWrap = styled.section`
  padding: 16px;
  font-size: var(--font-md);
  background-color: #fff;
  border-radius: 0 0 8px 8px;

  strong {
    font-weight: var(--font-bold);
  }
`;

const UserInfoBox = styled.div`
  width: 100%;
  padding: 18px 0;
  justify-content: center;
  display: flex;
  gap: 52px;
  border-bottom: 1px solid var(--border-color);
`;

const UserDescBox = styled.div`
  padding: 16px 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  strong {
    font-size: var(--font-lg);
  }
`;

const FollowInfo = styled.div`
  height: 64px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 18px;
`;
const MoveFollowBtn = styled.button`
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

const MoveEditBtn = styled.button`
  height: 34px;
  padding: 4px 25px;
  border-radius: 10px;
  background-color: #f1f1f5;
`;
