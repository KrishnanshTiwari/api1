const express = require('express');
const router = express.Router();

// Support route
router.get('/support', (req, res) => {
  // Redirect to the specified email address
  res.redirect('mailto:dummy@example.com');
});

module.exports = router;
