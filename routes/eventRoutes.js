const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventController");
const {isAuthenticated} = require('../middlewares/authMiddleware')
// POST /organizations/:organizationId/events
router.post("/organizations/:organizationId/events",isAuthenticated, createEvent);
router.get("/organizations/:organizationId/events",isAuthenticated,getEvents);

module.exports = router;
