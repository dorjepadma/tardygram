require('dotenv').config();
const { getPost, getUser } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Post = require('../lib/models/Post');

describe('post routes', () => {
  

  it('creates a post', () => {
    return request(app)
      .post('/api/v1/post')
      .send({ userId: expect.any(String),
        photoUrl: 'https://picsum.photos/200/300',
        caption: 'What a swass photo',
        tags: '#swassPhoto' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          photoUrl: 'https://picsum.photos/200/300',
          caption: 'What a swass photo',
          tags: '#swassPhoto', 
          __v: 0
        });
      });
  });
});
