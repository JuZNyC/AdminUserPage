const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejs = require('ejs')
require('dotenv').config();

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI, (err) =>{
    console.log('mongo db connected', err);
});

const usersSchema = {
    firstName : {type: String, required: true},
    lastName: {type: String, required: true},
    email : {type: String, required: true, index: { unique: true }},
    password : {type: String, required: true},
    userType: {type: String, enum: ["student", "faculty", "admin"]},
}

const users = mongoose.model('users', usersSchema);

app.get('/', (req, res) => {
    users.find({}, function (err, users) {
        res.render('index', {
            userList: users
        })
    })
})

app.listen(4000, function () {
    console.log('server is running');
})