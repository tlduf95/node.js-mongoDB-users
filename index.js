
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tlduf95:wkd1cjf1@react-mongo-first-pyky1.mongodb.net/test?retryWrites=true&w=majority'
, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Conneted'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World! 안녕하세요'))

app.post('/register', (req, res) => {
    //회원가입 필요 정보 client 가져옴
    //가져온 정보 DB에 넣음

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))