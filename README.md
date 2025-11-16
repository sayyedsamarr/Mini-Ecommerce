📌 1. Chosen Stack & Why
Backend: Node.js + Express

Lightweight, fast, and ideal for building simple, clean APIs.
Fits naturally with JWT authentication and REST structure.

ORM: Sequelize (MySQL)
Speeds up model creation.
Matches relational nature of categories → products.
Easy to use for seeding, associations, and querying.

Database: MySQL
Stable relational DB.
Great for structured product data, relations, filters, price ranges.

Frontend: React
Clean UI.
React Router for routing between pages.
Component-based structure ideal for scalability.

Authentication
Google OAuth (Preferred by assignment) implemented with passport-google-oauth20.
Fallback login (username/password) implemented with JWT (for easier review/testing).

Uploads
Local folder /uploads.
Simple, demo-friendly image hosting.

📌 2. Project Structure
Mini Ecommerce/
│
├── backend/
│   ├── server.js
│   ├── config/
│   │    └── database.js
│   ├── models/
│   │    ├── index.js
│   │    ├── category.js
│   │    └── products.js
│   ├── routes/
│   │    ├── authEnd.js       (Google OAuth + fallback)
│   │    ├── public.js        (public APIs)
│   │    └── admin.js         (admin-protected APIs)
│   ├── middleware/
│   │    └── auth.js
│   ├── services/
│   │    └── passport.js
│   ├── uploads/
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── ApiBase.js
    │   ├── App.js
    │   └── index.js
    ├── public/
    └── .env

📌 3. Local Setup — Backend
Install dependencies
cd backend
npm install

Configure backend .env
PORT=4000
UPLOAD_DIR=uploads
FRONTEND_URL=http://localhost:3000

# MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=mini_ecommerce
DB_USER=root
DB_PASS=your_password

# JWT
JWT_SECRET=supersecretkey

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

# Allowed Google admin email
ADMIN_GOOGLE_EMAIL=admin@company.com

# Fallback login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

COOKIE_SESSION_KEY=somerandomkey

Start backend
npm run dev


Backend will run at:
👉 http://localhost:4000

📌 4. Local Setup — Frontend
Install dependencies
cd frontend
npm install

Configure .env
REACT_APP_API_BASE=http://localhost:4000

Start frontend
npm start


Frontend runs on:
👉 http://localhost:3000

📌 5. How to Seed Database (MySQL)
Option A — Raw SQL (fastest)

Run inside MySQL CLI or Workbench:

CREATE DATABASE IF NOT EXISTS mini_ecommerce;
USE mini_ecommerce;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  slug VARCHAR(150) NOT NULL UNIQUE,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category_id INT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_percent INT DEFAULT 0,
  images TEXT,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO categories (name, slug, active) VALUES
('Electronics', 'electronics', 1),
('Books', 'books', 1),
('Home & Kitchen', 'home-kitchen', 1),
('Clothing', 'clothing', 1);

INSERT INTO products (title, slug, description, category_id, price, discount_percent, images) VALUES
('Wireless Headphones','wireless-headphones','Comfortable wireless headphones.',1,99.99,10,'["https://via.placeholder.com/600x400"]'),
('Smartphone X1','smartphone-x1','Feature-packed smartphone.',1,499.00,5,'["https://via.placeholder.com/600x400"]'),
('JavaScript Book','javascript-book','Learn JavaScript.',2,29.99,20,'["https://via.placeholder.com/600x400"]'),
('Ceramic Mug Set','ceramic-mug-set','Set of 4 mugs.',3,19.99,0,'["https://via.placeholder.com/600x400"]'),
('Cotton T-Shirt','cotton-tshirt','Soft cotton tee.',4,15.00,30,'["https://via.placeholder.com/600x400"]');

📌 6. Admin Login — Method & Test Credentials
Option A: Google OAuth Login (Preferred)

Open Google Cloud Console → OAuth
Add redirect URL:
http://localhost:4000/auth/google/callback

Add frontend origin:
http://localhost:3000

Put Google keys in backend .env
Admin Email Restriction
Backend ensures only allowed admin can log in:

ADMIN_GOOGLE_EMAIL=admin@company.com

Login Flow
Go to frontend:
http://localhost:3000/admin/login
Click Login with Google

Backend verifies email → issues JWT → redirects to:

/admin/oauth?token=.....

Option B: Fallback Login (username/password)

Defined in .env:

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

Login API
POST /api/admin/login


Body:

{
  "username": "admin",
  "password": "admin123"
}


Returns:

{
  "token": "JWT_TOKEN_HERE"
}


Stored in LocalStorage as:

admin_token

📌 7. Admin Features (Fully Implemented)
✔ Categories

Create

Update

Activate / Deactivate

Unique name + unique slug

✔ Products

Create

Update

Activate / Deactivate

Multiple images

File upload (/api/admin/upload)

Final price auto-calculation

Validation + error/success messages

📌 8. Public Website Features (Fully Implemented)
✔ Home

Active categories

Search bar

✔ Product Listing Page

Filters included:

category

price range

minimum discount

Sorting included:

newest

price low → high

price high → low

discount high → low

Plus pagination (6 items per page).

✔ Product Detail Page

Title

Description

Image gallery

Price

Discount

Final price

Category breadcrumb

📌 9. Notable Trade-offs
⚠ Local uploads instead of S3

Used local uploads/ folder for demo simplicity.

⚠ Images stored as JSON array in DB

Simple and fast. For production, separate table may be cleaner.

⚠ No checkout/cart

Out of scope (as per assignment).

⚠ Sequelize without migrations

Faster for demo. Could be added later.
