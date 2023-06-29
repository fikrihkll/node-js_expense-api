const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      // Split the header value to separate the Bearer keyword and the token
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
  
      try {
        // Verify the token using your JWT library of choice
        const decodedToken = jwt.verify(bearerToken, 'your-secret-key');
  
        // Attach the decoded token to the request object for further use
        req.decodedToken = decodedToken;
  
        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        // Token verification failed
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      // Bearer token is missing
      res.status(401).json({ message: 'Bearer token missing' });
    }
  };