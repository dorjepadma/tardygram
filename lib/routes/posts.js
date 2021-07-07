
const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensure-auth');
// eslint-disable-next-line new-cap
module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create(req.body)
      .then(post => res.send(post))
      .catch(next);
  })
  // GET /posts by id
  .get('/:id', ensureAuth, (req, res, next) => {
    Post
      .findById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })
// GET all posts
  .get('/', ensureAuth, (req, res, next) => {
    Post
      .find()
      .then(post => res.send(post))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(post => res.send(post))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Post
      .findByIdAndDelete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });
// responds with a post by id
// should include the populated user
// should include all comments associated with the post (populated with commenter)
// HINT: You'll need to make two separate queries and a Promise.all
// PATCH /posts/:id
// requires authentication
// only can update the post caption
// respond with the updated post
// NOTE: make sure the user attempting to update the post owns it

// NOTE: make sure the user attempting to delete the post owns it
// GET /posts/popular
// respond with a list of the 10 posts with the most comments

