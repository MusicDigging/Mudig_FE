import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
import { backAnimationAtom, commentEditInfoAtom } from '../../library/atom';

import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentItem from '../../components/PlaylistDetail/CommentItem';

import { ReactComponent as CommentIcon } from '../../img/comment-icon.svg';
import { ReactComponent as BackIcon } from '../../img/left-arrow-icon-white.svg';
import * as S from './CommentStyle';

export default function Reply() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { mode, parentId, playlistId, playlistWriter, editContent } = state;

  const [modalId, setModalId] = useState(null);
  const [isReplyOpen, setIsReplyOpen] = useState(true);
  const [backAnimation, setBackAnimation] = useRecoilState(backAnimationAtom);
  const [editInfo, setEditInfo] = useRecoilState(commentEditInfoAtom);

  const { data, isLoading } = useGetPlaylistDetail(playlistId);

  if (isLoading) return null;
  const { comments } = data;

  const comment = comments.find((comment) => comment.id === parentId);
  const replies = comments.filter(
    (reply) => reply.parent === parentId && reply.is_active,
  );

  const handleReplyBtnClick = (id) => {
    setIsReplyOpen((prev) => !prev);
  };

  const handleBackBtn = () => {
    setBackAnimation(true);
    setEditInfo(null);
    navigate(-1);
  };

  return (
    <S.CommentWrap>
      <S.CommentBox
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
      >
        <S.CommentTop>
          <S.BackBtn onClick={handleBackBtn}>
            <BackIcon />
          </S.BackBtn>
          <h1>답글 달기</h1>
        </S.CommentTop>
        <S.CommentListBox>
          <CommentItem
            mode={mode}
            playlistId={playlistId}
            comment={comment}
            replies={replies}
            modalId={modalId}
            setModalId={setModalId}
            playlistWriter={playlistWriter}
            isVisible={true}
          >
            {replies && (
              <>
                <div>
                  <S.ReplyBtn onClick={() => handleReplyBtnClick(comment.id)}>
                    <CommentIcon alt='답글' />
                    {replies.length}
                  </S.ReplyBtn>
                </div>

                {isReplyOpen &&
                  replies.map(
                    (reply) =>
                      reply.is_active && (
                        <CommentItem
                          key={reply.id}
                          mode={mode}
                          writer={reply.writer}
                          comment={reply}
                          modalId={modalId}
                          setModalId={setModalId}
                          isActive={reply.is_active}
                          parentId={comment.id}
                          playlistId={playlistId}
                          parentWriter={comment.writer}
                          playlistWriter={playlistWriter}
                        />
                      ),
                  )}
              </>
            )}
          </CommentItem>
        </S.CommentListBox>
        <CommentForm
          playlistId={playlistId}
          parentId={parentId}
          editInfo={editInfo}
          setEditInfo={setEditInfo}
        />
      </S.CommentBox>
    </S.CommentWrap>
  );
}
