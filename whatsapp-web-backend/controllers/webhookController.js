const Message = require('../models/Message');

const extractMessages = (metaData) => {
  return metaData.entry?.flatMap(entry =>
    entry.changes?.flatMap(change => change.value?.messages || [])
  ) || [];
};

const extractStatuses = (metaData) => {
  return metaData.entry?.flatMap(entry =>
    entry.changes?.flatMap(change => change.value?.statuses || [])
  ) || [];
};

exports.processWebhook = async (req, res) => {
  const { payload_type, metaData } = req.body;

  try {
    if (payload_type !== 'whatsapp_webhook') {
      return res.status(400).json({ error: 'Invalid payload_type' });
    }

    const messages = extractMessages(metaData);
    const statuses = extractStatuses(metaData);

    console.log(messages, 'messages');
    console.log(statuses, 'statuses');

    const contact = metaData.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];
    const businessMetadata = metaData.entry?.[0]?.changes?.[0]?.value?.metadata;

    for (const msg of messages) {
      if (!msg.id) continue;

      const isIncoming = msg.from !== businessMetadata?.display_phone_number;

      const senderWaId = isIncoming ? contact?.wa_id : businessMetadata?.display_phone_number;
      const senderName = isIncoming ? (contact?.profile?.name || 'Unknown') : 'Business';

      const receiverWaId = isIncoming ? businessMetadata?.display_phone_number : contact?.wa_id;
      const receiverName = isIncoming ? 'Business' : (contact?.profile?.name || 'Unknown');

      await Message.updateOne(
        { meta_msg_id: msg.id },
        {
          meta_msg_id: msg.id,
          conversation_id: metaData.gs_app_id || undefined,

          senderWaId,
          senderName,
          receiverWaId,
          receiverName,

          text: msg.text?.body || '',
          type: msg.type || 'text',
          timestamp: new Date(parseInt(msg.timestamp, 10) * 1000),

          status: 'sent',

          messaging_product: businessMetadata?.messaging_product || 'whatsapp',
          phone_number_id: businessMetadata?.phone_number_id,
          display_phone_number: businessMetadata?.display_phone_number
        },
        { upsert: true }
      );
    }

    for (const status of statuses) {
      await Message.findOneAndUpdate(
        { meta_msg_id: status.id },
        {
          status: status.status
        }
      );
    }

    return res.status(200).json({ message: 'Webhook processed' });
  } catch (err) {
    console.error('❌ Webhook processing error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
