const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
    category_id: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    discount_percent: { type: DataTypes.INTEGER, defaultValue: 0 },
    images: { type: DataTypes.TEXT }, // JSON string
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'products'
  });
};
