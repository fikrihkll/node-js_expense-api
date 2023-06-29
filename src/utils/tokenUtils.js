const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.generateNewToken = async (user) => {
  
    const newToken = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', {
        expiresIn: '90d',
    });
  
    return { newToken };
  }