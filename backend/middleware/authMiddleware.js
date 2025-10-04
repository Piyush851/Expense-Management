// authMiddleware.js

// Example: Simple token-based authentication middleware
function authMiddleware(req, res, next) {
  // Get token from headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Here, we can verify the token. For demo, assume token === "12345" is valid
  if (token === "12345") {
    // Attach user info to request object
    req.user = { id: 1, name: "Kumkum" };
    next(); // allow request to proceed
  } else {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

module.exports = authMiddleware;
