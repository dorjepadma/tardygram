const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String, 
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
}); 
schema.virtual('comments', {
  ref: 'comment',
  localField: '._id',
  foreignField: 'post'
});
module.exports = mongoose.model('Post', schema);

