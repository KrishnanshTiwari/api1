// authMiddleware.js
const { auth } = require("../services/firebaseService");

const isAuthenticated = (req, res, next) => {
  const { uid } = req.headers; // Get the user's unique identifier from the headers
  if (!uid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = { uid }; // Set user information on the request object
  next();
};

module.exports = { isAuthenticated };
