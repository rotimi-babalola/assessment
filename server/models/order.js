'use strict';
/* eslint no-undef:0 */
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Created', 'Pending', 'Delivered'),
      defaultValue: 'Created',
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
