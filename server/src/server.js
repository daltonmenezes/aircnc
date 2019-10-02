require('dotenv').config({ path: __dirname + '/.env' })

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')
const app = express()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-nmejl.mongodb.net/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)
