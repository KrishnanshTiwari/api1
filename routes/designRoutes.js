const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createDesign, getFileList } = require("../controllers/designController");

const upload = multer();

// POST /organizations/:organizationId/designs
router.post("/organizations/:organizationId/designs", upload.single("file"), createDesign);

// GET /organizations/:organizationId/designs
router.get("/organizations/:organizationId/designs", async (req, res) => {
  try {
    const fileList = await getFileList(req.params.organizationId);
    res.status(200).json(fileList);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve file list" });
  }
});


module.exports = router;
