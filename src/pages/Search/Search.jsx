import React, { useState } from 'react';
import Nav from '../../components/common/Nav/Nav';
import Header from '../../components/common/Header/Header';

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
      <div>Search</div>
      <Nav />
    </>
  );
}
