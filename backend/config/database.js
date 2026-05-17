

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
require('dotenv').config()

mongoose.set('bufferCommands', false)

let mongoServer = null

async function connectToMongo(uri) {
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  })
}

async function startMemoryMongo() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    console.log('Started in-memory MongoDB at', uri)
    return uri
  }
  return mongoServer.getUri()
}

exports.connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/StudyNotion'
    try {
        await connectToMongo(mongoUri)
        console.log('DB connection successful!')
        return
    } catch (error) {
        console.warn('DB Connection Failed:', error.message || error)
    }

    if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
      try {
        const memoryUri = await startMemoryMongo()
        await connectToMongo(memoryUri)
        console.log('Connected to in-memory MongoDB!')
        return
      } catch (memoryError) {
        console.error('In-memory MongoDB failed:', memoryError)
      }
    }

    const err = new Error('No MongoDB connection could be established.')
    console.error(err.message)
    throw err
}