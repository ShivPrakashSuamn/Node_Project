import { Sequelize, Model, DataTypes } from 'sequelize';

    const sequelize = new Sequelize('sqlite::memory:');

    const List = sequelize.define('list', {
        id: DataTypes.STRING,
        title: DataTypes.STRING,
        contact_id:DataTypes.STRING,
        create:DataTypes.DATE
    });