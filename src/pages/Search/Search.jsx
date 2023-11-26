import styled from 'styled-components';
import TestImg from '../../img/playlist-test-img.png';
// import CloseIcon from '../../assets/img/close-icon.svg';
import MoreIcon from '../../img/more-icon.svg';
import SearchIcon from '../../img/search-icon.svg';
import RightArrowIcon from '../../img/right-arrow-icon.svg';
// import TimePastIcon from '../../assets/img/time-past-icon.svg';
import * as S from './SearchStyle';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import { CircleImage } from '../../components/common/Image/Image';
export default function Search() {
  return (
    <S.SearchWrap>
      <form>
        <S.SearchInput type='text' placeholder='검색어를 입력하세요.' />
        <button>
          <img src={SearchIcon} alt='검색버튼' />
        </button>
      </form>
      <nav>
        <S.NavList>
          <li>
            <button>전체</button>
          </li>
          <li>
            <button>플리</button>
          </li>
          <li>
            <button>유저</button>
          </li>
        </S.NavList>
      </nav>
      <S.SearchListBox>
        <S.SearchListSection>
          <S.SearchListTitleBox>
            <h2>플리 검색결과</h2>
            <button>
              <img src={RightArrowIcon} alt='이동버튼' />
            </button>
          </S.SearchListTitleBox>
          <PlayList>
            <PlayListItem
              img={TestImg}
              title='몽환적인 밤도시 감성 R&B'
              info='Mudig Pick'
            >
              <button>
                <img src={MoreIcon} alt='더보기버튼' />
              </button>
            </PlayListItem>
            <PlayListItem
              img={TestImg}
              title='몽환적인 밤도시 감성 R&B'
              info='Mudig Pick'
            >
              <button>
                <img src={MoreIcon} alt='더보기버튼' />
              </button>
            </PlayListItem>
            <PlayListItem
              img={TestImg}
              title='몽환적인 밤도시 감성 R&B'
              info='Mudig Pick'
            >
              <button>
                <img src={MoreIcon} alt='더보기버튼' />
              </button>
            </PlayListItem>
          </PlayList>
        </S.SearchListSection>
        <S.SearchListSection>
          <S.SearchListTitleBox>
            <h2>유저 검색결과</h2>
            <button>
              <img src={RightArrowIcon} alt='이동버튼' />
            </button>
          </S.SearchListTitleBox>
          <S.UserList>
            <S.UserItem>
              <div>
                <CircleImage src={TestImg} alt='유저이미지' />
              </div>
              <S.UserInfoBox>
                <div>mumu__00</div>
                <p>뮤뮤 · 팔로잉</p>
              </S.UserInfoBox>
            </S.UserItem>
            <S.UserItem>
              <div>
                <CircleImage src={TestImg} alt='유저이미지' />
              </div>
              <S.UserInfoBox>
                <div>mumu__00</div>
                <p>뮤뮤 · 팔로잉</p>
              </S.UserInfoBox>
            </S.UserItem>
            <S.UserItem>
              <div>
                <CircleImage src={TestImg} alt='유저이미지' />
              </div>
              <S.UserInfoBox>
                <div>mumu__00</div>
                <p>뮤뮤 · 팔로잉</p>
              </S.UserInfoBox>
            </S.UserItem>
          </S.UserList>
        </S.SearchListSection>
      </S.SearchListBox>
    </S.SearchWrap>
  );
}
