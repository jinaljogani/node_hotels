const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem');

router.post('/',async (req,res)=>{

    try{
        const data=req.body; //assumng request body contains persons data
        
        //create new person document using mongoosh model
        const newMenu=new MenuItem(data);
        //newPerson.name= data.name; this is complex way to store data for all fields

        //save new persons to database

        const response =await newMenu.save();
        console.log('data has saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
});

router.get('/',async (req,res)=>{
    try{
        const data =await MenuItem.find();
        console.log('data has received');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports = router;