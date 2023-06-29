const express = require('express');
const { validateToken } = require('../middlewares/tokenValidation');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;