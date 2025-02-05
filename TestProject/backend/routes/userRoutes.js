const express = require('express')
const router = express.Router();
const User = require('../model/userdb')
const jwt = require('jsonwebtoken');
const Note = require('../model/notedb');
require("dotenv").config()
router.post('/signup',async(req,res)=>{

    const username = req.body.username ;
    const password = req.body.password;
    const email = req.body.email;
    try{
        const existence = await User.findOne({email:email})
    if(existence!=null)
    {
        res.status(400).json({msg : "user already exist"});
        return ;
    }
    const newUser = new User({
        username , password , email
    });
    const result = await newUser.save();

    const token = jwt.sign({_id : result._id , email:result.email},process.env.JWT_SECRET_KEY);

    res.status(200).json({msg:"user created successfully",token : token});
    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({msg:"there is some error"});
    }
    
    return;
})


router.post('/signin',async(req,res)=>{
   
    try{
        const password = req.body.password;
        const email = req.body.email;
        const existence = await User.findOne({email:email})
        if(existence==null)
        {
            res.status(400).json({msg : "user does not exist"});
            return ;
        }
        if(password != existence.password)
        {
            res.status(500).json({msg : "Invalid Password"});
            return ;
        }
    
        const token = jwt.sign({_id : existence._id , email : existence.email},process.env.JWT_SECRET_KEY);
    
        res.status(200).json({msg:"user logged in successfully",token : token});

    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({msg:"there is some error"});
    }
    return;
})



router.post('/add-note',userMiddleware, async(req,res)=>{
    try{
        const title = req.body.title;
    const description = req.body.description;
    const newNote = new Note({title : title, description : description ,
        user: jwt.verify(req.body.token,process.env.JWT_SECRET_KEY)._id});
    const result = await newNote.save();
    res.status(200).json({
        msg : "note added successfully"
    });
    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({msg:"there is some error"});
    }
    // return;
})


router.get('/my-notes',async (req,res)=>{
    try{
        const notes = await Note.findMany({user:jwt.verify(req.body.token,process.env.JWT_SECRET_KEY)._id});
        res.status(200).json({myNotes : notes});

    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({msg:"there is some error"});
    }
    

})


module.exports = router;