(async() => {
  require('dotenv').config({ path: __dirname + '/config/.env' })

  process.env.internalIP = await require('internal-ip').v4()

  const path = require('path')
  const http = require('http')
  const mongoose = require('mongoose')
  const socketio = require('socket.io')
  const express = require('express')
  const routes = require('./routes')
  const cors = require('cors')

  const app = express()
  const server = http.Server(app)
  const io = socketio(server)
  const connectedUsers = {}

  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-nmejl.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  io.on('connection', socket => {
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
  })

  app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
  })

  app.use(cors())
  app.use(express.json())
  app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
  app.use(routes)

  server.listen(3333)
})()
