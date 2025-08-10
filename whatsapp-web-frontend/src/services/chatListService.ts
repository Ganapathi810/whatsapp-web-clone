

import { BACKEND_URL } from '../../config/envConstants'

export const fetchChatList = async (userWaId : string ) => {
  try {
    const res = await fetch(`${BACKEND_URL}/chats/list?userWaId=${encodeURIComponent(userWaId)}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch chat list');

    return data.data; 
  } catch (error) {
    console.error('Error fetching chat list:', error);
    return [];
  }
};