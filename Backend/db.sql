-- seed.sql
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
('Wireless Headphones', 'wireless-headphones', 'Comfortable wireless headphones with noise reduction.', 1, 99.99, 10, '["https://via.placeholder.com/600x400?text=headphone1","https://via.placeholder.com/600x400?text=headphone2"]'),
('Smartphone X1', 'smartphone-x1', 'Feature-packed smartphone with great battery life.', 1, 499.00, 5, '["https://via.placeholder.com/600x400?text=phone1","https://via.placeholder.com/600x400?text=phone2"]'),
('JavaScript Book', 'javascript-book', 'Learn modern JavaScript with examples.', 2, 29.99, 20, '["https://via.placeholder.com/600x400?text=book1"]'),
('Ceramic Mug Set', 'ceramic-mug-set', 'Set of 4 ceramic mugs for your kitchen.', 3, 19.99, 0, '["https://via.placeholder.com/600x400?text=mug1"]'),
('Cotton T-Shirt', 'cotton-tshirt', 'Soft breathable cotton t-shirt.', 4, 15.00, 30, '["https://via.placeholder.com/600x400?text=tshirt1"]'),
('Blender 3000', 'blender-3000', 'Powerful blender for smoothies.', 3, 89.50, 15, '["https://via.placeholder.com/600x400?text=blender1"]'),
('Novel: The Wanderer', 'novel-the-wanderer', 'A gripping fiction novel.', 2, 12.50, 0, '["https://via.placeholder.com/600x400?text=novel1"]'),
('Bluetooth Speaker', 'bluetooth-speaker', 'Portable speaker with deep bass.', 1, 39.99, 25, '["https://via.placeholder.com/600x400?text=speaker1"]');
