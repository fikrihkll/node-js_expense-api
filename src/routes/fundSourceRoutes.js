const express = require('express');
const router = express.Router();

const fundSourceController = require('../controllers/fundSourceController');
const { validateToken } = require('../middlewares/tokenValidation');

router.post('/create', validateToken, fundSourceController.createFundSource);
router.get('/:budgetId', validateToken, fundSourceController.getFundSourcesByBudgetId);

module.exports = router;