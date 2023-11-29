import React, { useState } from 'react';
import styled from 'styled-components';

import { CircleImage } from '../common/Image/Image';

export default function CommentItem() {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  function handleBtnClick() {
    return isReplyOpen === true ? setIsReplyOpen(false) : setIsReplyOpen(true);
  }

  return (
    <CommentItemWrap>
      <ProfileImgBox>
        <CircleImage src='https://picsum.photos/200/300' alt='프로필 이미지' />
      </ProfileImgBox>
      <DescBox>
        <UserInfoBox>
          <p>{`Sarah`}</p>
          <p>{`2023.11.22 오후 11:12:32 `}</p>
        </UserInfoBox>
        <CommentBox>
          <p>Very nice~</p>
          <button onClick={handleBtnClick}>답글 {`1`}</button>
          {/* 이후 childrean처리? */}
          {isReplyOpen && (
            <CommentItemWrap>
              <ProfileImgBox>
                <CircleImage
                  src='https://picsum.photos/200/300'
                  alt='프로필 이미지'
                />
              </ProfileImgBox>
              <DescBox>
                <UserInfoBox>
                  <p>{`Sarah`}</p>
                  <p>{`2023.11.22 오후 11:12:32 `}</p>
                </UserInfoBox>
                <CommentBox>
                  <p>Very nice~</p>
                </CommentBox>
              </DescBox>
            </CommentItemWrap>
          )}
        </CommentBox>
      </DescBox>
    </CommentItemWrap>
  );
}

const CommentItemWrap = styled.li`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;

const ProfileImgBox = styled.div`
  width: 24px;
  height: 24px;
`;

const DescBox = styled.div``;

const UserInfoBox = styled.div`
  padding-top: 4px;
  margin-bottom: 6px;
  font-size: var(--font-sm);
  p:last-child {
    margin-top: 4px;
    color: var(--sub-font-color);
  }
`;
const CommentBox = styled.div`
  p {
    font-size: var(--font-md);
    margin-bottom: 6px;
  }
  button {
    font-size: var(--font-sm);
    color: var(--sub-font-color);
  }
`;
