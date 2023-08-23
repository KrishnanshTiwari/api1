const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/authMiddleware')
// Support route
router.get('/support',isAuthenticated, (req, res) => {
  // Redirect to the specified email address
  res.redirect('mailto:dummy@example.com');
});

module.exports = router;
