// errorHandler.js

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${new Date().toISOString()}:`, err.message);

  // Set default status code
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // optional: include stack trace in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

module.exports = errorHandler;
