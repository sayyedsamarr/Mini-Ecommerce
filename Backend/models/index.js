const sequelize = require('../config/database'); // this should return the Sequelize instance
const Category = require('./category')(sequelize);
const Product = require('./products')(sequelize);

// association
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = { sequelize, Category, Product };
