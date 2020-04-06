const { getComment, getComments, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('comment routes', () => {

  it('creates a comment', () => {
    return getAgent()
      .post('/api/v1/comments')
      .send({
        post: new mongoose.Types.ObjectId(),
        comment: 'Something',
        commentBy: new mongoose.Types.ObjectId(),
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          post: expect.any(String),
          comment: expect.any(String),
          commentBy: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
});

