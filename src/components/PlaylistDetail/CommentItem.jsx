import React, { useState } from 'react';
import styled from 'styled-components';

import { useDeleteComment } from '../../hooks/queries/useComment';

import { CircleImage } from '../common/Image/Image';
import MiniModal, { MiniModalWrap } from '../common/Modal/MiniModal';

import MoreIcon from '../../img/more-icon.svg';

export default function CommentItem(props) {
  const myId = 67; // 유저 아이디값 (이후 리코일로 가져옴)
  const { mutate: deleteComment } = useDeleteComment();

  const {
    writer,
    comment,
    isVisible,
    setParentId,
    setContent,
    editId,
    setEditId,
    modalId,
    setModalId,
    children: replies,
  } = props;

  const convertDatetime = (dateTime) => {
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
  };

  const checkDatetimeEqual = (time1, time2) => {
    // 두 시간의 초 단위(이후 소수점 무시)까지 비교, 같으면 true
    return time1.slice(0, 19) === time2.slice(0, 19);
  };

  const handleMoreBtnClick = () => {
    if (modalId) setModalId(null);
    else setModalId(comment.id);
  };

  const handleReplyBtnClick = () => {
    setParentId(comment.id);
    setModalId(null);
  };

  const handleEditBtnClick = () => {
    if (comment.parent) setParentId(comment.parent);
    setEditId(comment.id);
    setContent(comment.content);
    setModalId(null);
  };
  const handleDeleteBtnClick = () => {
    deleteComment(comment.id);
  };
  console.log(writer);
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
          {/* 답글의 작성자와 현재 접속한 유저가 다를 때 버튼 안보이게 처리*/}
          {(comment.parent !== null && writer !== myId) || (
            <MoreBtn onClick={handleMoreBtnClick}>
              <img src={MoreIcon} alt='더보기' />
            </MoreBtn>
          )}
          {/* modal이 오픈된 댓글 id 비교  */}
          {modalId === comment.id && (
            <MiniModalStyle>
              {/* 댓글일 때만 답글 달기 기능 추가  */}
              {comment.parent === null && (
                <button onClick={handleReplyBtnClick}>답글 달기</button>
              )}
              {/* 작성자와 현재 접속한 유저가 같을 때만 수정/삭제 기능 추가  */}
              {writer === myId && (
                <>
                  <button onClick={handleEditBtnClick}>댓글 수정</button>
                  <button onClick={handleDeleteBtnClick}>댓글 삭제</button>
                </>
              )}
            </MiniModalStyle>
          )}
        </UserInfoBox>
        <Comment
          $color={comment.is_active ? '' : 'var(--sub-font-color)'}
          $bgColor={
            editId === comment.id ? 'rgba(137, 105, 255, 0.05)' : 'none'
          }
        >
          {comment.is_active ? comment.content : '삭제된 댓글입니다.'}
        </Comment>
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
  font-size: var(--font-sm);
  p:last-child {
    margin-top: 4px;
    color: var(--sub-font-color);
  }
`;

const Comment = styled.p`
  padding: 6px 0;
  font-size: var(--font-md);
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$bgColor};
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
