const express = require("express");
const {
  getAllNotices,
  createNotice,
  addReplyToNotice,
} = require("../controllers/noticeController");
const router = express.Router();

router.get("/", getAllNotices); 
router.post("/", createNotice); 
router.post("/:id/replies", addReplyToNotice); 

module.exports = router;
