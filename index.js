
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tlduf95:wdk1cjf1@react-mongo-first-pyky1.mongodb.net/test?retryWrites=true&w=majority'
, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB 연결'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World! 안녕하세요'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))