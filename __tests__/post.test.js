require('dotenv').config();

const { getPosts, getUser, getAgent, getPost, getComments } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('post routes', () => {
  
  it('creates a post', async() => {
    const user = await getUser({
      username: 'vixen'
    });
   
    return getAgent()
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://picsum.photos/200/300',
        caption: 'What a swass photo',
        tags: ['#swassPhoto'],
        user: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: 'https://picsum.photos/200/300',
          caption: 'What a swass photo',
          tags: ['#swassPhoto'],
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
});
