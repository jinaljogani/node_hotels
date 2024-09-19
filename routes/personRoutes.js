const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

//route to add person in db
router.post('/signup', async (req, res) =>{

    try{
        const data=req.body //assumng request body contains persons data
        
        //create new person document using mongoosh model
        const newPerson=new Person(data);
        //newPerson.name= data.name; this is complex way to store data for all fields

        //save new persons to database
        const response =await newPerson.save();
        console.log('data has saved');
        //res.status(200).json(response);
    
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
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
            res.status(500).json({error:'intrnal error'});
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


