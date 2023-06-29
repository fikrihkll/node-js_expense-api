const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const fundSourceRoutes = require('./routes/fundSourceRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

const initAssociations = require('./models/associations');
initAssociations();

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);
app.use('/expense', expenseRoutes);
app.use('/fund_source', fundSourceRoutes);

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables created!');
    // Start the server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });