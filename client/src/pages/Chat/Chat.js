import React, { useState } from 'react'

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

  return (
    <ChatEngine
      height='100vh'
      userName='adam'
      userSecret='pass1234'
      projectID='8dd8b8ef-62c5-4332-8643-dbc0c92cf501'
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  )
}

export default DirectChatPage;