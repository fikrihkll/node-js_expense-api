
const expenseController = require('../controllers/expenseController');
const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/tokenValidation');

router.post('/upload', validateToken, expenseController.uploadExpenses);
router.get('/get', validateToken, expenseController.get);

module.exports = router;