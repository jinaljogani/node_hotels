const mongoose= require('mongoose');
require('dotenv').config();


//define mongoDB connection URL
const mongoURL= process.env.DB_URL  
//const mongoURL = 'mongodb://localhost:27017/hotels' ; //hotels can be replace with your databse name
//set up mongoDB connection

mongoose.connect(mongoURL , {

    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get default connection

const db = mongoose.connection;

//define event listener for database connection 

db.on('connected', ()=>{
    console.log('connected to mongoDB server');
}
)
db.on('error', (err)=>{
    console.log('Mongodb connection error :',err);
})
db.on('disconnected', ()=>{
    console.log('dis-connected to mongoDB');
})

// export database connection

module.exports= db;