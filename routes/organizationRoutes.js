const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController'); // Import your organization controller
const {isAuthenticated} = require('../middlewares/authMiddleware')
router.get('/organizations',isAuthenticated, organizationController.getOrganizations);
router.post('/organizations',isAuthenticated, organizationController.createOrganization);

module.exports = router;
