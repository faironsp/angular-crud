const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
 
app.use(express.static(path.join(__dirname, 'dist', 'my-app'
)))
 
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'dist', 'frontend', 'index.html'))
})
 
app.listen(port)