const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventController");

// POST /organizations/:organizationId/events
router.post("/organizations/:organizationId/events", createEvent);
router.get("/organizations/:organizationId/events",getEvents);

module.exports = router;
