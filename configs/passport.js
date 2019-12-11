
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtOptions = require("./jwtOptions");
const User = require('../model/user');

let JwtStrategy = passportJWT.Strategy;

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  User.findOne({ where: { id: jwt_payload.id }}).then(user => {
      console.log(user);
      if (user) {
        next(null, user.dataValues);
      } else {
        next(null, false);
      }
  });

 
});
// use the strategy
passport.use(strategy);

module.exports = passport;