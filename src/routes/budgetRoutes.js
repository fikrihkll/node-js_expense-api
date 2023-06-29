const budgetController = require('../controllers/budgetController');
const express = require('express');
const { validateToken } = require('../middlewares/tokenValidation');
const router = express.Router();

router.post('/create', validateToken, budgetController.createNewBudget);
router.post('/add_user', validateToken, budgetController.addBudgetUser);
router.get('/', validateToken, budgetController.getBudgetsByUserId);

module.exports = router;