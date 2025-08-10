const express = require('express')
const { getAllChatsList } = require('../controllers/chatsListController')
const router = express.Router()


router.get('/', getAllChatsList)

module.exports = router;