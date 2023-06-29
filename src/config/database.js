const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_db', 'root', 'dibawahkursi', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;