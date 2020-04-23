
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");

const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Conneted'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('HELLO WORLD!!!!!!!!'))

app.post('/register', (req, res) => {
    // 회원가입 필요 정보 client 가져옴
    // 가져온 정보 DB에 넣음

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    });
});

app.post('/login', (req, res) => {
    // find Database
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: 'There is no matching email'
            }); 
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) 
            return res.json({ 
                loginSuccess: false, message: 'Password is wrong.'
            });
            
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            });
        })
    });
});

/* app.post('/login', (req, res) => {
    // 요청된 이메일을 DB에 있는지 찾음
    // err은 콜백함수(err, @@)
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 이메일 유저가 없습니다."
            })
        }
    // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ 
                    loginSuccess: false, 
                    message: "비밀번호가 틀렸습니다."
                })
    // 모두 맞다면 유저 Token 생성
                user.generateToken( (err, user) => {
                    if (err) return res.status(400).send(err);

    // 토큰 저장. 쿠키
                        res.cookie("x_auth", user.token)
                        .status(200)
                        .json({ loginSuccess: true, userId: user._id })


    

                })
         
            
            })
            
                
        })
    }) */



   

    // 모두 맞다면 유저 Token 생성



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))