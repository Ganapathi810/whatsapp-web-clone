export type ChatListItem = {
  _id: string; 
  userWaId: string; 
  contactWaId: string;
  contactName?: string;
  conversation_id : string; 
  lastMessage?: string;
  lastMessageType?: 'text' | 'image' | 'audio' | 'video' | 'document';
  lastMessageTimestamp?: string; 
  lastMessageStatus?: 'sent' | 'delivered' | 'read';
};
