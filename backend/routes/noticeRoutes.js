const express = require("express");
const {
  getAllNotices,
  createNotice,
  addReplyToNotice, // Import the reply handler
} = require("../controllers/noticeController");
const router = express.Router();

router.get("/", getAllNotices); // Fetch all notices
router.post("/", createNotice); // Create a new notice
router.post("/:id/replies", addReplyToNotice); // Add a reply to a notice

module.exports = router;
