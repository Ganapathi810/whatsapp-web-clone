const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  meta_msg_id: { type: String, required: true, unique: true }, 
  conversation_id: { type: String }, 

  senderWaId: { type: String, required: true }, 
  senderName: { type: String }, 
  receiverWaId: { type: String, required: true }, 
  receiverName: { type: String }, 

  text: { type: String }, 
  type: { type: String, enum: ['text', 'image', 'audio', 'video', 'document'], default: 'text' }, 

  timestamp: { type: Date, required: true },

  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'], 
    default: 'sent' 
  },

  messaging_product: { type: String, default: 'whatsapp' },
  phone_number_id: { type: String }, 
  display_phone_number: { type: String }, 

}, { timestamps: true });

const Message = mongoose.model('processed_messages', messageSchema);

module.exports = Message;
