const express = require('express');
const Notice = require('../models/Notice');
const router = express.Router();

// Get All Notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add New Notice
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newNotice = new Notice({ title, description });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
