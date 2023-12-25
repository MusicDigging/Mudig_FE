import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { userInfoAtom } from '../../library/atom';
import { useDeleteComment } from '../../hooks/queries/useComment';

import { CircleImage } from '../common/Image/Image';
import MiniModal, { MiniModalWrap } from '../common/Modal/MiniModal';

import MoreIcon from '../../img/more-icon.svg';
import { ReactComponent as ProfileBadge } from '../../img/badge-icon.svg';

export default function CommentItem(props) {
  const myId = useRecoilValue(userInfoAtom).id;

  const { mutate: deleteComment } = useDeleteComment();

  const {
    writer,
    comment,
    isVisible,
    parentId,
    setParentId,
    setContent,
    editId,
    setEditId,
    modalId,
    setModalId,
    parentWriter,
    playlistWriter,
    children: replies,
  } = props;

  const convertDatetime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const convertedDatetime = `${year}.${month}.${day} ${hour}:${minute}`;
    return convertedDatetime;
  };

  const checkDatetimeEqual = (time1, time2) => {
    // 두 시간의 초 단위(이후 소수점 무시)까지 비교, 같으면 true
    return time1.slice(0, 19) === time2.slice(0, 19);
  };

  const handleMoreBtnClick = () => {
    if (modalId === comment.id) setModalId(null);
    else setModalId(comment.id);
  };

  const handleReplyBtnClick = () => {
    setParentId(comment.id);
    setEditId(null);
    setModalId(null);
    setContent('');
  };

  const handleEditBtnClick = () => {
    setEditId(comment.id);
    setParentId(null);
    setContent(comment.content);
    setModalId(null);
  };
  const handleDeleteBtnClick = () => {
    deleteComment(comment.id);
  };
  console.log(parentId);
  return (
    <CommentItemWrap display={isVisible === false ? 'none' : 'flex'}>
      <CommentBox
        $bgColor={
          editId === comment.id || parentId === comment.id
            ? 'rgba(137, 105, 255, 0.08)'
            : 'none'
        }
      >
        <ProfileImgBox>
          <Link
            to={
              myId === comment.writer
                ? '/user/profile/my'
                : `/user/profile/${comment.writer}`
            }
            state={{ id: comment.writer }}
          >
            <CircleImage
              src={comment.writer_profile.image}
              alt='프로필 이미지'
            />
          </Link>
        </ProfileImgBox>
        <DescBox>
          <UserInfoBox>
            <UserInfo>
              <Link
                to={
                  myId === comment.writer
                    ? '/user/profile/my'
                    : `/user/profile/${comment.writer}`
                }
                state={{ id: comment.writer }}
              >
                {playlistWriter === comment.writer ? (
                  <ProfileBadge alt='배지 아이콘' />
                ) : parentWriter === comment.writer ? (
                  <span>작성자</span>
                ) : (
                  ''
                )}

                <p>{comment.writer_profile.name}</p>
              </Link>
              <div>
                <p>
                  {convertDatetime(comment.created_at)}
                  {checkDatetimeEqual(
                    comment.created_at,
                    comment.updated_at,
                  ) || <span> (수정됨)</span>}
                </p>
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
                    {comment.writer === myId && (
                      <>
                        <button onClick={handleEditBtnClick}>
                          {comment.parent === null ? '댓글' : '답글'} 수정
                        </button>
                        <button onClick={handleDeleteBtnClick}>
                          {comment.parent === null ? '댓글' : '답글'} 삭제
                        </button>
                      </>
                    )}
                  </MiniModalStyle>
                )}
              </div>
            </UserInfo>
          </UserInfoBox>
          <Comment $color={comment.is_active ? '' : 'var(--sub-font-color)'}>
            {comment.is_active ? comment.content : '삭제된 댓글입니다.'}
          </Comment>
        </DescBox>
      </CommentBox>
      <CommentReplies>{replies}</CommentReplies>
    </CommentItemWrap>
  );
}

const CommentItemWrap = styled.div`
  display: ${(props) => props.display || 'flex'};
  flex-direction: column;
  padding: 12px 0;
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
  font-size: var(--font-sm);

  p {
    color: var(--sub-font-color);
  }
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    span {
      display: flex;
      align-items: center;
      height: 18px;
      padding: 0 7px;
      font-size: 11px;
      border-radius: 10px;
      background: #e5dcff;
      font-weight: var(--font-semi-bold);
      color: var(--point, #7d4fff);
    }
    p {
      color: #000;
      font-weight: var(--font-semi-bold);
    }
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

const Comment = styled.p`
  padding: 8px 0;
  font-size: var(--font-md);
  color: ${(props) => props.$color};
`;

const CommentBox = styled.div`
  display: flex;
  gap: 10px;
  background-color: ${(props) => props.$bgColor};
  border-radius: 10px;
`;
const CommentReplies = styled.div`
  & > div {
    padding-left: 30px;
  }
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
