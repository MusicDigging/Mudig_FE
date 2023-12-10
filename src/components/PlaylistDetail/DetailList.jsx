import PlayList from '../common/PlayList/PlayList';
import PlayListItem from '../common/PlayList/PlayListItem';
import TestImg from '../../img/thumbnail-img.svg';
import ExtendIcon from '../../img/arrow-icon.svg';
import { ReactComponent as ArrowIcon } from '../../img/arrow-icon.svg';

export default function DetailList(props) {
  const { music } = props;
  const [more, setMore] = useState(false);
  /**
   * 맨 처음에는 2개의 플리만 보여주고
   * 더보기 버튼을 누르면 10개씩 추가로 보여준다.
   * 마지막 플리까지 보여줬다면 화살표의 방향을 바꿔준다.
   * 해당 버튼을 누르면 다시 처음의 2개의 플리만 보여준다.
   */
  const handleMore = () => {
    setMore(!more);
  };
  return (
    <DetailListWrap>
      <PlayList>
        {music.map((item, index) => (
          <PlayListBtn
            key={item.id}
            value={item.information}
          >
            <PlayListItem
              img={item.thumbnail}
              title={item.song}
              info={item.singer}
            >
            </PlayListItem>
          </PlayListBtn>
        ))}
      </PlayList>
      <ExtendBtn onClick={handleMore} more={more}>
        <ArrowIcon fill='black' />
      </ExtendBtn>
    </DetailListWrap>
  );
}
const DetailListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayListBtn = styled.button`
  width: 100%;
  padding: 0 16px;
`;
const ExtendBtn = styled.button`
  svg {
    transform: rotate(${({ more }) => (more ? '270deg' : '90deg')});
  }
`;
