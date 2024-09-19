const express = require ('express');
const app = express();
const db= require('./db');
require('dotenv').config();
const passport = require('./auth');
//const Person = require('./models/Person');
//const MenuItem = require('./models/MenuItem');

const bodyParser= require('body-parser');
app.use(bodyParser.json()); //store in request.body
const PORT= process.env.PORT || 3000;

//middleware function

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()} Request Made to: ${req.originalUrl}]`);
    next();
}
app.use(logRequest);


app.use(passport.initialize());

const localAuthaMiddleware = passport.authenticate('local',{session:false});

 //import router file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes= require('./routes/menuItemRoutes');

app.get('/',(req,res)=>
    {
        res.send("Welcom to our hotel");

    });
   
    
    
    //use routers
    app.use('/person',personRoutes);
    app.use('/menu',localAuthaMiddleware, menuItemRoutes);


    app.listen(PORT , ()=>
    {
        console.log('listening on port 3000');
    });