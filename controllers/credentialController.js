const { db } = require('../services/firebaseService');

const issueCredential = async (req, res) => {
  try {
    const { organizationId, eventId } = req.params;

    // Retrieve event data from Firestore
    const eventRef = db.collection("organizations").doc(organizationId)
      .collection("events").doc(eventId);

    const eventSnapshot = await eventRef.get();
    const eventData = eventSnapshot.data();

    if (!eventData) {
      return res.status(404).json({ error: "Event not found" });
    }
    const { uid } = req.headers; // Get the user's unique identifier from the headers

    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Generate credential data
    const credentialData = {
      eventName: eventData.name,
      designUrl: eventData.design,
      user : uid,
      // Add other credential data as needed
    };

    // Store credential data in Firestore
    const credentialsCollection = eventRef.collection("credentials");
    await credentialsCollection.add(credentialData);

    return res.status(201).json({ message: "Credential issued successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Unable to issue credential", details: error.message });
  }
};

module.exports = { issueCredential };
