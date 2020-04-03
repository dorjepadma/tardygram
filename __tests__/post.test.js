require('dotenv').config();
const { getPost, getUser, getAgent } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('post routes', () => {
  
  it('creates a post', async() => {
    const user = await getUser({
      email: 'happy@happyvixen.com'
    });
    console.log(user);
    return getAgent()
      .post('/api/v1/post')
      .send({ 
        photoUrl: 'https://picsum.photos/200/300',
        caption: 'What a swass photo',
        tags: '#swassPhoto' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: user._id,
          photoUrl: 'https://picsum.photos/200/300',
          caption: 'What a swass photo',
          tags: '#swassPhoto', 
          __v: 0
        });
      });
  });
});
