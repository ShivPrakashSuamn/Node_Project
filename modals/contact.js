import { Sequelize, Model, DataTypes } from 'sequelize';

    const sequelize = new Sequelize('sqlite::memory:');

    const Contact = sequelize.define('Contact', {
    id: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    dob:DataTypes.STRING,
    phone:DataTypes.STRING,
    image:DataTypes.STRING,
    address:DataTypes.STRING,
    city:DataTypes.STRING,
    pin_code:DataTypes.STRING,
    status:DataTypes.STRING,
    create:DataTypes.DATE
    });