const Notice = require('../models/Notice');

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notices', error: err.message });
  }
};

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newNotice = new Notice({ title, description });
    const savedNotice = await newNotice.save();

    res.status(201).json(savedNotice);
  } catch (err) {
    res.status(500).json({ message: 'Error creating notice', error: err.message });
  }
};

// Add a reply to a notice
const addReplyToNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Reply text is required' });
    }

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const reply = {
      _id: new mongoose.Types.ObjectId(),
      text,
      repliedBy: req.user || { name: 'Anonymous' }, // Example for user context
      createdAt: new Date(),
    };

    notice.replies.push(reply);
    await notice.save();

    res.status(201).json({ message: 'Reply added successfully', data: reply });
  } catch (err) {
    res.status(500).json({ message: 'Error adding reply', error: err.message });
  }
};

module.exports = { getAllNotices, createNotice, addReplyToNotice };
