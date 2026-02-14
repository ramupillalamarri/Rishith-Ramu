const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('postgres')) {
    // Use PostgreSQL if DATABASE_URL is provided and contains postgres
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
    });
} else {
    // Use SQLite as default for development
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../smarthire.db'),
        logging: false,
    });
}

module.exports = sequelize;
