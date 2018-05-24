'use strict';
/* eslint no-undef:0 */
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    name: {
      type: DataTypes.STRING,
    },
    isCompleted: {
      type: DataTypes.ENUM('Created', 'Pending', 'Delivered'),
      defaultValue: 'Created',
    },
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
