import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { userInfoAtom } from '../../library/atom';
import { useDeleteComment } from '../../hooks/queries/useComment';

import { CircleImage } from '../common/Image/Image';
import MiniModal, { MiniModalWrap } from '../common/Modal/MiniModal';

import {
  convertDatetime,
  checkDatetimeEqual,
} from '../../library/DateTimeUtils';

import MoreIcon from '../../img/more-icon.svg';
import { ReactComponent as ProfileBadge } from '../../img/badge-icon.svg';

export default function CommentItem(props) {
  const {
    mode,
    playlistId,
    writer,
    comment,
    replies,
    parentId,
    editId,
    modalId,
    setModalId,
    parentWriter,
    playlistWriter,
    children,
  } = props;
  const myId = useRecoilValue(userInfoAtom).id;
  const { mutate: deleteComment } = useDeleteComment();

  const isMyComment = myId === comment.writer;
  const isPlaylistWriter = playlistWriter === comment.writer;
  const isParentWriter = parentWriter === comment.writer;

  const handleMoreBtnClick = () =>
    setModalId(modalId === comment.id ? null : comment.id);

  const handleDeleteBtnClick = () => deleteComment(comment.id);

  const linkTo = isMyComment
    ? '/user/profile/my'
    : `/user/profile/${comment.writer}`;

  const CommentLink = ({ children }) => (
    <Link to={linkTo} state={{ id: comment.writer }}>
      {children}
    </Link>
  );

  // 답글의 작성자와 현재 접속한 유저가 다를 때 버튼 안보이게 처리
  // 답글 페이지에서 댓글의 작성자와 현재 접속한 유저가 다를 때 버튼 안보이게 처리
  const shouldDisplayMoreBtn = () => {
    if (mode === 'reply') {
      return comment.writer === myId;
    } else {
      return comment.parent === null || comment.writer === myId;
    }
  };

  return (
    <CommentItemWrap>
      <CommentBox
        $bgColor={
          editId === comment.id || parentId === comment.id
            ? 'rgba(137, 105, 255, 0.08)'
            : 'none'
        }
      >
        <ProfileImgBox>
          <CommentLink>
            <CircleImage
              src={comment.writer_profile.image}
              alt='프로필 이미지'
            />
          </CommentLink>
        </ProfileImgBox>
        <DescBox>
          <UserInfoBox>
            <UserInfo>
              <CommentLink>
                {isPlaylistWriter ? (
                  <ProfileBadge alt='배지 아이콘' />
                ) : isParentWriter ? (
                  <span>작성자</span>
                ) : (
                  ''
                )}
                <p>{comment.writer_profile.name}</p>
              </CommentLink>
              <div>
                <p>
                  {convertDatetime(comment.created_at)}
                  {checkDatetimeEqual(
                    comment.created_at,
                    comment.updated_at,
                  ) || <span> (수정됨)</span>}
                </p>
                {shouldDisplayMoreBtn() && (
                  <MoreBtn onClick={handleMoreBtnClick}>
                    <img src={MoreIcon} alt='더보기' />
                  </MoreBtn>
                )}
                {/* modal이 오픈된 댓글 id 비교  */}
                {modalId === comment.id && (
                  <MiniModalStyle>
                    {/* 댓글일 때만 답글 달기 기능 추가  */}
                    {mode !== 'reply' && comment.parent === null && (
                      <Link
                        to={`/playlist/detail/${playlistId}/reply`}
                        state={{
                          mode: 'reply',
                          comment: comment,
                          replies,
                          parentId: comment.id,
                          playlistId,
                          playlistWriter,
                          animation: true,
                        }}
                      >
                        답글 달기
                      </Link>
                    )}
                    {/* 작성자와 현재 접속한 유저가 같을 때만 수정/삭제 기능 추가  */}
                    {comment.writer === myId && (
                      <>
                        <Link
                          to={
                            comment.parent === null
                              ? `/playlist/detail/${playlistId}/comment`
                              : `/playlist/detail/${playlistId}/reply`
                          }
                        >
                          {comment.parent === null ? '댓글' : '답글'} 수정
                        </Link>
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
      <CommentReplies>{children}</CommentReplies>
    </CommentItemWrap>
  );
}

const CommentItemWrap = styled.div`
  display: 'flex';
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
