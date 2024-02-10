// require packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')

// config express app
const app = express()
const PORT = process.env.PORT || 8000 
// for debug logging 
const rowdyResults = rowdy.begin(app)
// cross origin resource sharing 
app.use(cors())
// request body parsing
app.use(express.json())


// hey listen on a port
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`is that port ${PORT} I hear? 🙉`)
})

