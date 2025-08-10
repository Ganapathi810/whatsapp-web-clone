const Message = require('../models/Message');

exports.getMessagesOfChat = async (req, res) => {
    try {
    const { userWaId, contactWaId, conversation_id, limit = 50, skip = 0 } = req.query;

    if (!conversation_id && (!userWaId || !contactWaId)) {
      return res.status(400).json({
        success: false,
        message: 'Either conversation_id or both userWaId and contactWaId are required'
      });
    }

    let filter = {};

    if (conversation_id) {
      filter.conversation_id = conversation_id;
    } else {
      filter = {
        $or: [
          { senderWaId: userWaId, receiverWaId: contactWaId },
          { senderWaId: contactWaId, receiverWaId: userWaId }
        ]
      };
    }

    const messages = await Message.find(filter)
      .sort({ timestamp: 1 }) 
      .skip(Number(skip))
      .limit(Number(limit));

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });

  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching chat messages'
    });
  }
}