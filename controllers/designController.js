const { bucket } = require("../services/firebaseService");

const uploadFile = async (fileBuffer, filePath) => {
  const file = bucket.file(filePath);
  await file.save(fileBuffer);
  return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
};

const createDesign = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }
    const { organizationId } = req.params;
    const { uid } = req.headers; // Get the user's unique identifier from the headers

    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const fileUrl = await uploadFile(req.file.buffer, `${organizationId}/${uid}/${req.file.originalname}`);

    
    return res.status(201).json({ fileUrl });
  } catch (error) {
    return res.status(500).json({ error: "Unable to create design", details: error.message });
  }
};

const getFileList = async (organizationId) => {
  try {
    const [files] = await bucket.getFiles({ prefix: `${organizationId}/` });
    const fileList = files.map((file) =>`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`);
    return fileList;
  } catch (error) {
    console.error("Error retrieving file list:", error);
    throw new Error("Unable to retrieve file list");
  }
};


module.exports = { createDesign, getFileList };
