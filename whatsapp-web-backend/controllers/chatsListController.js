const Message = require('../models/Message');

exports.getAllChatsList = async (req, res) => {
  try {
    const { userWaId } = req.query;
    if (!userWaId) {
      return res.status(400).json({
        success: false,
        message: 'userWaId is required'
      });
    }

    const chats = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderWaId: userWaId },
            { receiverWaId: userWaId }
          ]
        }
      },
      {
        $addFields: {
          contactWaId: {
            $cond: [
              { $eq: ["$senderWaId", userWaId] },
              "$receiverWaId",
              "$senderWaId"
            ]
          },
          contactName: {
            $cond: [
              { $eq: ["$senderWaId", userWaId] },
              "$receiverName",
              "$senderName"
            ]
          }
        }
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
            _id: "$contactWaId",
            userWaId: { $first: userWaId },
            contactWaId: { $first: "$contactWaId" },
            contactName: { $first: "$contactName" },
            conversation_id: { $first: "$conversation_id" }, // include conversation ID
            lastMessage: { $first: "$text" },
            lastMessageType: { $first: "$type" },
            lastMessageTimestamp: { $first: "$timestamp" },
            lastMessageStatus: { $first: "$status" }
        }
      },
      { $sort: { lastMessageTimestamp: -1 } }
    ]);

    res.json({
      success: true,
      count: chats.length,
      data: chats
    });

  } catch (error) {
    console.error('❌ Error fetching chat list:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching chat list'
    });
  }
};
