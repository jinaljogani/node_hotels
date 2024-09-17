const express = require ('express');
const app = express();
const db= require('./db');
require('dotenv').config();
//const Person = require('./models/person');
//const MenuItem = require('./models/MenuItem');


const bodyParser= require('body-parser');
app.use(bodyParser.json()); //store in request.body
const PORT= process.env.PORT || 3000;


app.get('/', function(req,res)
    {
        res.send("hello jinu");

    })



    //import router file
    //const personRoutes = require('./routes/personRoutes');
    const personRoutes = require('./routes/personRoutes');
    const MenuItemRoutes= require('./routes/menuItemRoutes');
    
    //use routers
    app.use('/person',personRoutes);
    app.use('/menu', MenuItemRoutes);


    app.listen(PORT , ()=>
    {
        console.log('listening on port 3000');
    })