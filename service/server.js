const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./db')

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    connection.connect((err) => {
        if(err){
            throw err;
        }
        console.log('Database connected')
    })
})