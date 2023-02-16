const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    nikname: {type: DataTypes.STRING},
    
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Adress = sequelize.define('adress', {
    typePost: {type: DataTypes.STRING},
    firstClass: {type: DataTypes.BOOLEAN, defaultValue: false},
    postCode: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    adress: {type: DataTypes.STRING},
    oblast: {type: DataTypes.STRING},
    raion: {type: DataTypes.STRING},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    codeInside: {type: DataTypes.STRING},
    codeOutside: {type: DataTypes.STRING },
    price: {type: DataTypes.STRING},
    other: {type: DataTypes.STRING }, 
    status: {type: DataTypes.INTEGER}
})

const Photo = sequelize.define('photo', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING},
    format: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    paper: {type: DataTypes.STRING}
})

const Status = sequelize.define('status', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    step:{type: DataTypes.INTEGER}
})

User.hasMany(Order)
User.hasMany(Adress)

Order.belongsTo(User)
Order.belongsTo(Adress)
Order.hasMany(Photo)
Order.hasMany(Status)

Adress.hasMany(Order)
Photo.belongsTo(Order) 

Status.belongsTo(Order) 

module.exports = {User, Order, Adress, Photo, Status}