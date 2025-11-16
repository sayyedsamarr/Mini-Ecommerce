require("dotenv").config({ path: require("path").join(__dirname, ".env") });
console.log("ENV LOADED:", process.env.ADMIN_GOOGLE_EMAIL);

const express = require("express")
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const dbInstance = require('./models')


const FRONTEND = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/+$/, '');

const server = express()

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use(cors({
    origin: FRONTEND,
    credentials: true
}));
const PORT = process.env.PORT || 4000;


// It's Create upload directory if its not exist
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || "uploads")
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }
    )
}


const configurePassport = require('./services/passport'); // this exports passport instance
const passport = configurePassport; // it's already the passport instance
server.use(passport.initialize());


server.use('/uploads', express.static(uploadDir)) // allowing the images at client site


//routes
const authEnd = require('./routes/authEnd')
const publicRoutes = require('./routes/public')
const adminRoutes = require('./routes/admin')

server.use('/', authEnd);             // auth endpoints like /auth/google
server.use('/api', publicRoutes);     // public api: /api/category(s), /api/products
server.use('/api/admin', adminRoutes);// admin api



// Checking the api
server.use('/api/health', (req, res, next) => {
    try {
        res.json({ ok: true });
    } catch (err) {
        next(err);   // forwards error to global error handler
    }
});


(async () => {
  try {
    const sequelize = dbInstance && dbInstance.sequelize
      ? dbInstance.sequelize
      : (dbInstance && dbInstance.default && dbInstance.default.sequelize)
        ? dbInstance.default.sequelize
        : null;

    if (!sequelize) {
      throw new Error('Could not find sequelize instance exported from ./models. Ensure models/index.js exports { sequelize, Category, Product }');
    }

    // Test connection
    await sequelize.authenticate();
    console.log('DB Connected');
    const env = process.env.NODE_ENV || 'development';

    if (env === 'development') {
      if (process.env.FORCE_SYNC === 'true') {
        await sequelize.sync({ force: true });
      } else {
        await sequelize.sync(); // <--- no { alter: true } here
        console.log('Sequelize sync() completed (development).');
      }
    } else {
      console.log('Production mode — skipping sequelize.sync(). Apply schema changes with migrations.');
    }
    server.listen(PORT, () => console.log(`Server is Listening on ${PORT}`));
  } catch (err) {
    console.log('Failed to start', err);
    process.exit(1);
  }
})();
