import CommentForm from '../../components/PlaylistDetail/CommentForm';
import CommentSection from '../../components/PlaylistDetail/CommentSection';
import DetailList from '../../components/PlaylistDetail/DetailList';
import MusicPlayBar from '../../components/PlaylistDetail/MusicPlayBar';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlayListModify from '../../components/PlaylistDetail/PlayListModify';

export default function PlaylistDetail() {
  return (
    <>
      <PlayListInfo />
      <MusicPlayBar />
      <DetailList />
      <CommentSection />
      <CommentForm />
    </>
  );
}
