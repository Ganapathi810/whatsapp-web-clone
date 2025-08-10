import { useEffect, useState } from "react"
import { ChatHeader } from "../chat-header"
import { MessageArea, type Message } from "../message-area"
import { MessageInput } from "../message-input"
import bgImage from '@/assets/bgImage.jpg'
import type { ChatListItem } from "@/types/chatListItem"
import { fetchChatMessages } from "@/services/fetchChatService"

export const ChatWindow = ({ activeChat } : { activeChat : ChatListItem}) => {
    const [input,setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const { contactWaId, conversation_id,userWaId } = activeChat;

    useEffect(() => {
    if (!activeChat) return;

    (async () => {
      setLoading(true);
      const data = await fetchChatMessages({userWaId, contactWaId, conversation_id });
      setMessages(data);
      setLoading(false);
    })();
  }, [activeChat]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
        senderWaId: "918329446654", 
        text: input,
        type: "text",
        timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    };

    return (
        <div className="flex-1 ml-16 md:ml-auto h-screen flex flex-col">
            <ChatHeader activeChat={activeChat} />
            <div style={{ backgroundImage : `url(${bgImage})`, opacity : '95%'}} className="grow flex flex-col justify-between">
                <MessageArea  messages={messages} loading={loading}/>
                <MessageInput input={input} setInput={setInput}  handleSend={handleSend}/>
            </div>
        </div>

    )
}