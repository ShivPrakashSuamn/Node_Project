
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  id: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password:DataTypes.STRING,
  created:DataTypes.DATE
});