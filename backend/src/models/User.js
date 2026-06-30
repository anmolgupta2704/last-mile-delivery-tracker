const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Roles: customer, agent, admin
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false }, // hashed
  role: {
    type: DataTypes.ENUM('customer', 'agent', 'admin'),
    allowNull: false,
    defaultValue: 'customer',
  },
  phone: { type: DataTypes.STRING },
  // For delivery agents: current zone + availability used by auto-assignment
  currentZoneId: { type: DataTypes.UUID, allowNull: true },
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true }, // only relevant for agents
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;