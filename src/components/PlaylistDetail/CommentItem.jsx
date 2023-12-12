import React, { useState } from 'react';
import styled from 'styled-components';

import MiniModal, { MiniModalWrap } from '../common/Modal/MiniModal';
import { CircleImage } from '../common/Image/Image';

import MoreIcon from '../../img/more-icon.svg';

export default function CommentItem(props) {
  const { comment, isVisible, setParentId, children: replies } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  function convertDatetime(dateTime) {
    const date = new Date(dateTime);
    const convertedDatetime = date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return convertedDatetime;
  }

  function checkDatetimeEqual(time1, time2) {
    // 두 시간의 초 단위(이후 소수점 무시)까지 비교, 같으면 true
    return time1.slice(0, 19) === time2.slice(0, 19);
  }

  function handleMoreBtnClick() {
    setIsModalOpen(!isModalOpen);
  }

  function handleReplyBtnClick() {
    setParentId(comment.id);
    setIsModalOpen(false);
  }

  return (
    <CommentItemWrap display={isVisible === false ? 'none' : 'flex'}>
      <ProfileImgBox>
        <CircleImage src={comment.writer_profile.image} alt='프로필 이미지' />
      </ProfileImgBox>
      <DescBox>
        <UserInfoBox>
          <div>
            <p>{comment.writer_profile.name}</p>
            <p>
              {convertDatetime(comment.created_at)}
              {checkDatetimeEqual(comment.created_at, comment.updated_at) || (
                <span> (수정됨)</span>
              )}
            </p>
          </div>
          <MoreBtn onClick={handleMoreBtnClick}>
            <img src={MoreIcon} alt='더보기' />
          </MoreBtn>
          {isModalOpen && (
            <MiniModalStyle>
              {comment.parent === null && (
                <button onClick={handleReplyBtnClick}>답글 달기</button>
              )}
              <button>댓글 수정</button>
              <button>댓글 삭제</button>
            </MiniModalStyle>
          )}
        </UserInfoBox>
        <Comment>{comment.content}</Comment>
        <CommentBox>{replies}</CommentBox>
      </DescBox>
    </CommentItemWrap>
  );
}

const CommentItemWrap = styled.div`
  display: ${(props) => props.display || 'flex'};
  gap: 10px;
  margin-top: 6px;
`;

const ProfileImgBox = styled.div`
  width: 24px;
  height: 24px;
`;

const DescBox = styled.div`
  flex-grow: 1;
`;

const UserInfoBox = styled.div`
  position: relative;
  display: flex;
  padding-top: 4px;
  margin-bottom: 6px;
  font-size: var(--font-sm);
  p:last-child {
    margin-top: 4px;
    color: var(--sub-font-color);
  }
`;

const Comment = styled.p`
  font-size: var(--font-md);
  margin-bottom: 6px;
`;

const CommentBox = styled.div`
  span {
    font-size: var(--font-sm);
    color: var(--sub-font-color);
  }
`;

const MoreBtn = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  img {
    width: 20px;
  }
`;

const MiniModalStyle = styled(MiniModalWrap)`
  right: 0;
  top: 32px;
`;
