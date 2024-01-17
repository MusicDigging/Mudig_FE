import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import CloseIcon from '../../img/close-icon.svg';
import TimePastIcon from '../../img/time-past-icon.svg';
interface StoredKeyword {
  id: number;
  keyword: string;
}
interface Props {
  recentKeywords: StoredKeyword[];
  handleRemoveAllRecentKeyword: () => void;
  handleRemoveRecentKeyword: (arg0: number) => void;
}
export default function RecentSearch() {
  const {
    recentKeywords,
    handleRemoveAllRecentKeyword,
    handleRemoveRecentKeyword,
  }: Props = useOutletContext();
  const navigate = useNavigate();

  return (
    <RecentSearchWrap>
      {recentKeywords.length !== 0 && (
        <>
          <p>최근 검색어</p>
          <RecentSearchList>
            {recentKeywords.map(({ id, keyword }: StoredKeyword) => {
              return (
                <li key={id}>
                  <div>
                    <img src={TimePastIcon} alt='최근검색' />
                    <button
                      onClick={() => {
                        navigate(`/search/${keyword}`);
                      }}
                    >
                      {keyword}
                    </button>
                  </div>
                  <button onClick={() => handleRemoveRecentKeyword(id)}>
                    <img src={CloseIcon} alt='삭제' />
                  </button>
                </li>
              );
            })}
          </RecentSearchList>
          <DeleteBtn onClick={handleRemoveAllRecentKeyword}>
            검색어 전체삭제
          </DeleteBtn>
        </>
      )}
    </RecentSearchWrap>
  );
}

const RecentSearchWrap = styled.div`
  margin-top: 28.68px;
  p:first-child {
    font-size: var(--font-sm);
    color: var(--sub-font-color);
    margin-bottom: 16px;
  }
`;
const RecentSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8.5px;
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: var(--font-md);
    color: var(--font-color);
    div {
      display: flex;
      align-items: center;
      gap: 12px;
      p {
        white-space: nowrap;
      }
    }
  }
`;
const DeleteBtn = styled.button`
  width: 79px;
  height: 33px;
  white-space: nowrap;
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
