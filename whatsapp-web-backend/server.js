const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const webhookRouter = require('./routes/webhookRouter')
const messagesRouter = require('./routes/messagesRouter')
const chatsListRouter = require('./routes/chatsListRouter')
const connectDB  = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
connectDB()
app.use(cors())

app.use(express.json())

app.use('/webhook',webhookRouter)
app.use('/messages/chat',messagesRouter)
app.use('/chats/list',chatsListRouter)


app.listen(PORT,() => {
    console.log('Server is running on port '+PORT)
})