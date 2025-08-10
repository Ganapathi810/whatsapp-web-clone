import { BACKEND_URL } from '../../config/envConstants'

interface fetchChatMessagesProps {
    userWaId : string,
    contactWaId : string,
    conversation_id : string,
    limit ?: number,
    skip ?: number
}

export const fetchChatMessages = async ({ userWaId, contactWaId, conversation_id, limit = 50, skip = 0 } : fetchChatMessagesProps) => {
  try {
    let url = '';

    if (conversation_id) {
      url = `${BACKEND_URL}/messages/chat?conversation_id=${conversation_id}&limit=${limit}&skip=${skip}`;
    } else {
      url = `${BACKEND_URL}/messages/chat?userWaId=${userWaId}&contactWaId=${contactWaId}&limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch chat messages');

    return data.data; // Array of messages
  } catch (error) {
    console.error('❌ Error fetching chat messages:', error);
    return [];
  }
};
