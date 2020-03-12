const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static('public'))

app.get('/restaurant/:id', (req, res) => {
    res.sendFile(path.resolve('./public/restaurant.html'))
})

app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`)
})