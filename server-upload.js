const express = require("express");
const multer = require("multer");
const uuid = require("uuid");


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to db.."));

const app = express();

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads');
    },
    filename : (req, file, callback) => {
        const {originalname} = file;
        callback(null, originalname);
    }
})
const upload = multer({storage})


app.use(express.static('public'));

app.post("/upload" , upload.single('avatar'),(req,res) => {
    return res.json({status: "OK"});
})


app.listen(3000, () => console.log('App is listening '));