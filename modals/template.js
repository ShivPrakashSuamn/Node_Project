import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const template = sequelize.define('template', {
  id: DataTypes.STRING,
  user_id: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  repo_path: DataTypes.STRING,
  index_path: DataTypes.STRING,
  draft_path: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
  status: DataTypes.STRING,
  created:DataTypes.DATE
});