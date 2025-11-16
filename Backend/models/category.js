const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define("Category", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        slug: { type: DataTypes.STRING, unique: true, allowNull: false },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }

    }, {
        tableName: "categories"
    }
    )
}