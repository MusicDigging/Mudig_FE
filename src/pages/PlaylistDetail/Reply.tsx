import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import { IComment } from '../../types/playlist';
import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';
import {
  backAnimationAtom,
  commentEditIdAtom,
  commentAtom,
} from '../../library/atom';
import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentItem from '../../components/PlaylistDetail/CommentItem';

import { ReactComponent as CommentIcon } from '../../img/comment-icon.svg';
import { ReactComponent as BackIcon } from '../../img/left-arrow-Icon.svg';
import * as S from './CommentStyle';

export default function Reply() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { mode, parentId, playlistId, playlistWriter } = state;

  const [modalId, setModalId] = useState<number | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(true);
  const [, setContent] = useRecoilState(commentAtom);
  const [backAnimation, setBackAnimation] = useRecoilState(backAnimationAtom);
  const [, setEditId] = useRecoilState(commentEditIdAtom);

  const { data, isLoading } = useGetPlaylistDetail(playlistId);

  if (isLoading) return null;
  const { comments } = data;

  const comment = comments.find((comment: IComment) => comment.id === parentId);
  const replies = comments.filter(
    (reply: IComment) => reply.parent === parentId && reply.is_active,
  );

  const handleReplyBtnClick = (id: number) => {
    setIsReplyOpen((prev) => !prev);
  };

  const handleBackBtn = () => {
    setBackAnimation(true);
    setEditId(null);
    setContent('');
    navigate(-1);
  };

  return (
    <S.CommentWrap>
      <S.CommentBox
        initial={{ x: backAnimation ? -300 : 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
      >
        <S.CommentTop>
          <S.BackBtn onClick={handleBackBtn} aria-label='뒤로 가기'>
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
          >
            {replies && (
              <>
                <S.ReplyBtnBox className={mode === 'reply' ? 'isReply' : ''}>
                  <S.ReplyBtn onClick={() => handleReplyBtnClick(comment.id)}>
                    <CommentIcon alt='답글' />
                    {replies.length}
                  </S.ReplyBtn>
                </S.ReplyBtnBox>

                {isReplyOpen &&
                  replies.map(
                    (reply: IComment) =>
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
        <CommentForm playlistId={playlistId} parentId={parentId} />
      </S.CommentBox>
    </S.CommentWrap>
  );
}
