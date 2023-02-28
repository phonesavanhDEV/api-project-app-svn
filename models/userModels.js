
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true

  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createat'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updateat'
  }
}, {
  tableName: 'tb_user',
  timestamps: true
});

module.exports = User;


