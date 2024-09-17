const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


router.post('/',async (req,res)=>{

    try{
        const data=req.body //assumng request body contains persons data
        
        //create new person document using mongoosh model
        const newPerson=new Person(data);
        //newPerson.name= data.name; this is complex way to store data for all fields

        //save new persons to database

        const response =await newPerson.save();
        console.log('data has saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data =await Person.find();
        console.log('data has received');
        res.status(200).json(data);


    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
})

router.get('/:workType', async (req,res)=>
    {
        try{
            const workType=req.params.workType;
            if(workType=='chef'||workType=='manager'||workType=='waiter'){
                const response = await Person.find({work:workType});
                console.log("response fetched");
                res.status(200).json(response);
            }
            else{
                res.status(404).json({error:'work not found'});
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:'intrnal server error'});
        }

    })

    router.put('/:id', async(req,res)=>{
        try{
            const personId= req.params.id; //extract id from url
            const updatedPersonData = req.body; //update data for person
            const response= await Person.findByIdAndUpdate(personId, updatedPersonData, {
                new: true ,//return updated document
                runValidators: true //run mongoose validation

            })
        if (!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);

        }
        catch{
            console.log(err);
            res.status(500).json({error:'intrnal server error'});

        }
    })

    router.delete('/:id', async(req,res)=>{
        try{
            const personId= req.params.id; //extract id from url
           
            const response= await Person.findByIdAndDelete(personId);
           
            if (!response){
                return res.status(404).json({error:'person not found'});
            }
            console.log('data deleted');
            res.status(200).json({message: 'person data deleted succesfully'});

            }
        catch(err){
            console.log(err);
            res.status(500).json({error:'intrnal server error'});

        }
    })



   // module.exports=personRoutes;
    module.exports = router;


