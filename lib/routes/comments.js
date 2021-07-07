const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/Comment');
// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment
      .create(req.body)
      .then(post => res.send(post))
      .catch(next);
  })
  
  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });

