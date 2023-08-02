import { Sequelize } from 'sequelize'

export default new Sequelize(
    "doorshop", 
    "postgres", 
    "root", 
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432
    }
)