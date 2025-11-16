// backend/services/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

console.log('services/passport.js LOADED');

// serialize/deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Only register strategy if env vars are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
  console.log('Google OAuth: configuring strategy');

  passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  // findOrCreate user in DB or return profile
  return done(null, { profile, accessToken });
}));
} else {
  console.log('Google OAuth: not registered');
}

module.exports = passport;
