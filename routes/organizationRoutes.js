const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController'); 
const {isAuthenticated} = require('../middlewares/authMiddleware')
router.get('/organizations',isAuthenticated, organizationController.getOrganizations);
router.post('/organizations',isAuthenticated, organizationController.createOrganization);
// Delete an organization
router.delete('/organizations/:organizationId', organizationController.deleteOrganization);
module.exports = router;
