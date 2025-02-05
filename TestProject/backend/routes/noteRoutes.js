


const express = require('express')
const router = express.Router();
const User = require('../model/userdb')
const jwt = require('jsonwebtoken');
const Note = require('../model/notedb');
require("dotenv").config();


router.get('/',async(req,res)=>{
    const notes = await Note.find({});
    res.status(200).json({notes : notes});
    return ;
})

module.exports = router;