const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL
        await mongoose.connect(MONGO_URL)
        console.log('MongoDB is connected successfully!')
    } catch (error) {
        console.log(error)
        console.log('Failed to connect to MongoDB')
        process.exit(1)
    }
}

module.exports = connectDB;