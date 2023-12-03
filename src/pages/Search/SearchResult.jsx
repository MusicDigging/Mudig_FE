import styled from 'styled-components';
import TestImg from '../../img/playlist-test-img.svg';
import MoreIcon from '../../img/more-icon.svg';
import SearchIcon from '../../img/search-icon.svg';
import RightArrowIcon from '../../img/arrow-icon.svg';
import * as S from './SearchResultStyle';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import Search from '../../components/Search/Search';
import { CircleImage } from '../../components/common/Image/Image';
import RecentSearch from '../../components/Search/RecentSearch';
import { useState } from 'react';
export default function SearchResult() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <S.SearchWrap>
      <Search
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      >
        {isSearchFocused ? (
          <button>취소</button>
        ) : (
          <button>
            <img src={SearchIcon} alt='검색버튼' />
          </button>
        )}
      </Search>
      {isSearchFocused ? (
        <RecentSearch />
      ) : (
        <>
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
        </>
      )}
    </S.SearchWrap>
  );
}
