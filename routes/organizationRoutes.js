const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController'); // Import your organization controller

router.get('/organizations', organizationController.getOrganizations);
router.post('/organizations', organizationController.createOrganization);

module.exports = router;
