const Joi = require("joi"); 
const { db } = require('../services/firebaseService');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const getOrganizations = async (req, res) => {
  try {
    const organizationsSnapshot = await db.collection('organizations').get();
    const organizations = organizationsSnapshot.docs.map(doc => ({
      organizationId: doc.id, // Add the organizationId
      ...doc.data() // Include other organization details
    }));
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve organizations' });
  }
};

const createOrganization = async (req, res) => {
  const newOrganization = req.body;
  const { error } = userSchema.validate(newOrganization);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  const { uid } = req.headers; // Get the user's unique identifier from the headers

  if (!uid) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Add the user's unique identifier to the event data
  newOrganization.createdBy = uid;
  try {
    await db.collection('organizations').add(newOrganization);
    res.status(201).json({ message: 'Organization created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to create organization' });
  }
};

const deleteOrganization = async (req, res) => {
  const { organizationId } = req.params;
  try {
    // Check if the organization exists
    const organizationRef = db.collection('organizations').doc(organizationId);
    const organizationDoc = await organizationRef.get();

    if (!organizationDoc.exists) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Check if the user has permission to delete the organization
    const { uid } = req.headers; // Get the user's unique identifier from the headers
    if (organizationDoc.data().createdBy !== uid) {
      return res.status(403).json({ error: 'Unauthorized to delete this organization' });
    }

    // Delete the organization
    await organizationRef.delete();

    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete organization' });
  }
};

module.exports = {
  getOrganizations,
  createOrganization,
  deleteOrganization, // Add the new deleteOrganization function
};

