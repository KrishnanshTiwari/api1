const express = require("express");
const router = express.Router();
const { issueCredential } = require("../controllers/credentialController");

router.post("/organizations/:organizationId/events/:eventId/issue-credential", issueCredential);

module.exports = router;
