require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const ticketRoutes = require('./routes/TicketRoutes')


// express app
const app = express()

// middleware
app.use(express.json())

app.use(cors())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/tickets', ticketRoutes)

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })