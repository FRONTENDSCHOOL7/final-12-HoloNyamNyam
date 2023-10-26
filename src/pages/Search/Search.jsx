import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from '../../components/common/Nav/Nav';
import SearchList from '../../components/Search/SearchList';
import Header from '../../components/common/Header/Header';

const List = styled.section`
  padding: 48px 0 60px 0;
  height: calc(100vh - 108px);
  background-color: white;
`;

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState('');
  function handleSearchKeyword(event) {
    setSearchKeyword(event.target.value);
  }
  return (
    <>
      <Header
        type='search'
        searchKeyword={searchKeyword}
        handleSearchKeyword={handleSearchKeyword}
      />
      <List>
        <SearchList searchKeyword={searchKeyword} />
      </List>
      <div>search</div>
      <Nav />
    </>
  );
}
