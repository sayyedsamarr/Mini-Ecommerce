// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');

// IMPORTANT: require the configured passport instance (services/passport must export passport)
const passport = require('../services/passport');

const router = express.Router();

// Basic admin login (fallback) - returns JWT
router.post('/api/admin/login', (req, res) => {
  console.log('=== LOGIN REQUEST BODY ===');
  console.log('raw body (req.body) ->', req.body);
  console.log('JSON stringified ->', JSON.stringify(req.body));
  console.log('keys ->', Object.keys(req.body));
  console.log('LOGIN BODY', req.body);
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username & password required' });
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '6h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Start Google OAuth flow (no session)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// Callback endpoint (no session)
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: (process.env.FRONTEND_URL || '/') + '/?oauth=fail', session: false }),
  (req, res) => {
    try {
      const profile = req.user && req.user.profile;
      console.log('Oauth Callback', profile)
      const email = (profile && profile.emails && profile.emails[0] && profile.emails[0].value) ? profile.emails[0].value : null;
      console.log("GOOGLE EMAIL RECEIVED:", email);
      console.log("ALLOWED ONLY:", process.env.ADMIN_GOOGLE_EMAIL);
      if (!email) return res.redirect((process.env.FRONTEND_URL || '/') + '/?oauth=fail_no_email');

      const allowedEmail = process.env.ADMIN_GOOGLE_EMAIL;
      const allowedDomain = process.env.ADMIN_GOOGLE_DOMAIN;
      let allowed = false;
      if (allowedEmail && email.toLowerCase() === allowedEmail.toLowerCase()) allowed = true;

      if (!allowed && allowedDomain && email.toLowerCase().endsWith('@' + allowedDomain.toLowerCase())) allowed = true;
      // if (!allowed) return res.redirect((process.env.FRONTEND_URL || '/') + '/?oauth=unauthorized');

      const token = jwt.sign({ googleEmail: email, name: profile.displayName || '', provider: 'google' }, process.env.JWT_SECRET || 'secret', { expiresIn: '6h' });

      // No server session to clear; we are stateless — just redirect with token (or set cookie)
      const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/oauth?token=${token}`;
      res.redirect(redirectUrl);
    } catch (err) {
      console.error('OAuth callback error', err);
      res.redirect((process.env.FRONTEND_URL || '/') + '/?oauth=error');
    }
  }
);

module.exports = router;
