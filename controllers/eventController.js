const Joi = require("joi");
const { db } = require('../services/firebaseService');


const userSchema = Joi.object({
  name: Joi.string().required(),
  design: Joi.string().required(),
  context: Joi.string().required(),
  website: Joi.string().required()
});

const createEvent = async (req, res) => {
  try {
    // Extract the organizationId from the URL parameter
    const { organizationId } = req.params;

    // Check if organizationId is defined
    if (!organizationId) {
      return res.status(400).json({ error: "Organization ID is missing"  });
    }

    const newEvent = req.body;
    const { error } = userSchema.validate(newEvent);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  const { uid } = req.headers; // Get the user's unique identifier from the headers

  if (!uid) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Add the user's unique identifier to the event data
  newEvent.createdBy = uid;

    // Create a new event in Firestore under the specified organization
    const eventCollection = db.collection("organizations").doc(organizationId).collection("events");
    await eventCollection.add(newEvent);

    return res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Unable to create event", details: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const EventsSnapshot = await db.collection("organizations").doc(organizationId).collection("events").get();
    const Events = EventsSnapshot.docs.map(doc => doc.data());
    res.json(Events);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve Events' });
  }
};

module.exports = { createEvent, getEvents };
