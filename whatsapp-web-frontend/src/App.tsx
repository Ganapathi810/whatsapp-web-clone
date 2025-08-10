import { useState } from 'react';
import './App.css'
import { Sidebar } from './components/sidebar'
import { ChatWindow } from './components/ui/chat-window'
import type { ChatListItem } from './types/chatListItem';

function App() {
  const [activeChat, setActiveChat] = useState<null | ChatListItem>(null);

  return (
    <div className='flex'>
      <Sidebar userWaId="918329446654" onSelectChat={setActiveChat} />
      <div className="flex-1 bg-[var(--my-dark-color)]">
        {activeChat ? (
          <ChatWindow activeChat={activeChat} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  )
}

export default App
