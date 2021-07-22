import React, { useEffect, useState } from 'react'
import User from '../../utils/UserAPI'
// import Badge from '@material-ui/core/Badge';
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import Alert from '@material-ui/lab/Alert';

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

const DirectChatPage = () => {
  const [username, setUsername] = useState('')

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    )
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>
          Create
        </button>
      </div>
    )
  }

  let UserName = ''

  const handleUsername = () => {
    User.me()
      .then(({ data: user }) => {
        console.log(user)
        UserName = user.username
      })
  }

  return (
    <>
      <ChatEngine
        height='100vh'
        userName={localStorage.getItem('username')}
        userSecret='pass1234'
        projectID='8dd8b8ef-62c5-4332-8643-dbc0c92cf501'
        renderNewChatForm={(creds) => renderChatForm(creds)}
        // onNewMessage={(chatId, message) => console.log(chatId, message, 'onNew'),alert('NEW MESSAGE BIOTCH!')}
        // onGetMessages={(chatId, messages) => console.log(chatId, messages, 'onGet')}
      />
    </>
  )
}

export default DirectChatPage;