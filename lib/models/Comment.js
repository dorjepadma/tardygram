const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model('Post', schema);
