const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  text: { type: String, required: true },
  repliedBy: { type: Object, default: { name: 'Anonymous' } },
  createdAt: { type: Date, default: Date.now },
});

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  replies: { type: [ReplySchema], default: [] }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notice', NoticeSchema);
