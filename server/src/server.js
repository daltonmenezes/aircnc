(async() => {
  require('dotenv').config({ path: __dirname + '/config/.env' })

  process.env.internalIP = await require('internal-ip').v4()

  const mongoose = require('mongoose')
  const express = require('express')
  const routes = require('./routes')
  const app = express()
  const cors = require('cors')
  const path = require('path')

  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-nmejl.mongodb.net/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  app.use(cors())
  app.use(express.json())
  app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
  app.use(routes)

  app.listen(3333)
})()
