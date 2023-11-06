import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../../components/common/Nav/Nav';
import SearchList from '../../components/Search/SearchList';
import Header from '../../components/common/Header/Header';
import searchLogo from '../../images/search-logo.svg';

const List = styled.section`
  padding: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: calc(100vh - 108px);
`;

const SearchImg = styled.img`
  background-color: #fff;
`;

const SearchP = styled.p`
  color: #c4c4c4;
`;

export default function Search() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !sessionStorage.getItem('_id') ||
      !sessionStorage.getItem('accountname') ||
      !sessionStorage.getItem('token')
    ) {
      navigate('/');
    }
  }, [navigate]);

  const [searchKeyword, setSearchKeyword] = useState('');
  function handleSearchKeyword(event) {
    setSearchKeyword(event.target.value);
  }

  if (
    !sessionStorage.getItem('_id') ||
    !sessionStorage.getItem('accountname') ||
    !sessionStorage.getItem('token')
  ) {
    return null;
  }
  return (
    <>
      <Header
        type='search'
        searchKeyword={searchKeyword}
        handleSearchKeyword={handleSearchKeyword}
      />
      <List>
        {searchKeyword ? (
          <SearchList searchKeyword={searchKeyword} />
        ) : (
          <SearchWrap>
            <SearchImg src={searchLogo} />
            <SearchP>또 누가 있을까요?</SearchP>
          </SearchWrap>
        )}
      </List>
      <Nav />
    </>
  );
}
