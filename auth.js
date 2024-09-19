// sets up Passport with a local authentication strategy, using a Person model for user data.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person= require('./models/Person');

passport.use(new LocalStrategy(async (USERNAME, password,done)=>{
    //authenticatation logic here
    try{
        console.log('received credentials:', USERNAME,password);
        const user = await Person.findOne({username:USERNAME});
        if(!user)
            return done(null,false,{message:'incorrect username'});

        const isPasswordMatch=await user.comparePassword(password);

        if(isPasswordMatch){
            console.log('User authenticated successfully');
            return done(null,user);
        }
        else{
            console.log('Password mismatch');
            return done(null,false ,{message:'incorrect password'});
        }

    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport; 