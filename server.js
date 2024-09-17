const express = require ('express');
const app = express();
const db= require('./db');
//const Person = require('./models/person');
//const MenuItem = require('./models/MenuItem');


const bodyParser= require('body-parser');
app.use(bodyParser.json()); //store in request.body

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
    app.listen(3000 , ()=>
    {
        console.log('listening on port 3000');
    })