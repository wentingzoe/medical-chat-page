import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

import { SearchIcon } from '../assets';

const ChannelSearch = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const getChannels = async () => {
    try {
      // TODO: fetch channels 
    } catch (error) {
      setSearch('');
      console.error('search error', error);
    }
  }
  const onSearch = (event) => {
    event.preventDefault()
    //* anychange in the search input will not refresh the page
    setLoading(true);
    setSearch(event.target.value);
    getChannels(event.target.value);
  };


  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
          <SearchIcon />
        </div>
        <input
          className='channel-search__input__test'
          placeholder='Search'
          type='text'
          value={search}
          onChange={onSearch}
        />
      </div>
    </div>
  )
}

export default ChannelSearch 