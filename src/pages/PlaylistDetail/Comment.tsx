import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  backAnimationAtom,
  commentEditIdAtom,
  commentAtom,
} from '../../library/atom';
import { useGetPlaylistDetail } from '../../hooks/queries/usePlaylist';

import { filterComments, filterReplies } from '../../library/CommentUtils';
import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentList from '../../components/PlaylistDetail/CommentList';

import { ReactComponent as BackIcon } from '../../img/left-arrow-Icon.svg';
import * as S from './CommentStyle';

export default function Comment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { playlistId, playlistWriter } = state;
  const setContent = useSetRecoilState(commentAtom);
  const setEditId = useSetRecoilState(commentEditIdAtom);
  const backAnimation = useRecoilValue(backAnimationAtom);
  const { data, isLoading } = useGetPlaylistDetail(playlistId);

  if (isLoading) return null;
  const { comments, playlist } = data;

  const replies = filterReplies(comments);
  const filteredComments =
    comments.length > 1 ? filterComments(comments, replies) : comments;

  const handleBackBtn = () => {
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
          <h1>댓글 쓰기</h1>
          <p>{playlist?.title}</p>
        </S.CommentTop>
        <S.CommentListBox>
          <CommentList
            comments={filteredComments}
            replies={replies}
            playlistId={playlistId}
            playlistWriter={playlistWriter}
          ></CommentList>
        </S.CommentListBox>
        <CommentForm playlistId={playlistId} />
      </S.CommentBox>
    </S.CommentWrap>
  );
}
