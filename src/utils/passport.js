const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../api/users/users.model');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user._id, username: user.username });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
});

module.exports = passport;