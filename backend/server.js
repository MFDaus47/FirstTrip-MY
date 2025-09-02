require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

app = express()

// Middleware
app.use(express.json()) // to parse JSON bodies

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(' db is connected & Server is running on ', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

app.get('/', (req, res) => {
  console.log('Hello World!')
  res.send('Hello world')
})
