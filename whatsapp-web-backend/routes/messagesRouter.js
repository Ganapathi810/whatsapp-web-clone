const express = require('express')
const { getMessagesOfChat } = require('../controllers/messagesController')
const router = express.Router()


router.get('/', getMessagesOfChat)

module.exports = router;