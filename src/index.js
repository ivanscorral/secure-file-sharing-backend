const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Constants
const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sfs-fileMetadata'

// Middleware
app.use(express.json())
app.use(cors())

// Routes
const fileRoutes = require('./routes/fileRoutes')

app.use('/api/files', fileRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

mongoose.connect(MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

module.exports = app
