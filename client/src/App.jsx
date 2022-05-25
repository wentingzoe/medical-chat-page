import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';
import './App.css';

const cookies = new Cookies();
const apiKey = 'cnzcdd7qbbvs';
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get('token');

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullname: cookies.get('fullname'),
    image: cookies.get('avatarurl'),
    hashedPassword: cookies.get('hashedPassword'),
    phonenumber: cookies.get('phonenumber'),
  }, authToken);
}

function App() {
  if (!authToken) return <Auth />;

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  )
}

export default App