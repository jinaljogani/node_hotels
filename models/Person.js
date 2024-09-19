const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define persons schema'
const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    
    age:{
        type: Number
    },
    
    work:{
        type: String,
        enum:[ 'chef','waiter','manager'],
        required: true
    
    },
    
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});
personSchema.pre('save', async function(next){
    const person= this;
    //hash pass only if it has modified(or new)
    if(!person.isModified('password')) return next();

    try{
        //hash pass generate
        const salt = await bcrypt.genSalt(10);
        //hash pass
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override plan pss with hash one
        person.password=hashedPassword;

        next();
    }catch(err){
        return next(err);

    }
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const inMatch= await bcrypt.compare(candidatePassword,this.password);
        return inMatch;

    }
    catch(err){
        throw err;
    }
}


//create person models

const Person= mongoose.model('Person',personSchema);

module.exports =Person;



