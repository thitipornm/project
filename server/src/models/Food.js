module.exports = ( sequelize, DataTypes ) => {
    const Food = sequelize.define('Food', {
        foodname: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        receipt: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
    })
    return Food
}