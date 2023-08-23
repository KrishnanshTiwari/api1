const express = require("express");
const router = express.Router();
const { issueCredential } = require("../controllers/credentialController");
const {isAuthenticated} = require('../middlewares/authMiddleware')
router.post("/organizations/:organizationId/events/:eventId/issue-credential",isAuthenticated, issueCredential);

module.exports = router;
