const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Fooditem = require('./../menu/foodSchema');

passport.use(new localStrategy(async (user, pwd, done)=>{
    try {
        console.log('Received credential',user,pwd);
        const usern = await Fooditem.findOne({username:user});
        if(!usern)
            return done(null,false,{message: 'Incorrect Username'});
        const check = usern.password === pwd ? true : false;
        if(check){
            return done(null,usern);
        }
        else return done(null,check,{message: 'password is incorrect'});
    } catch (error) {
        return done(error);
    }
}))

module.exports = passport;