'use strict';
/* eslint no-undef:0 */
module.exports = (sequelize, DataTypes) => {
  var Food = sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Food.associate = function (models) {
    // associations can be defined here
    Food.hasMany(models.Order, {
      foreignKey: 'foodId',
      as: 'orders',
    });
  };
  return Food;
};
