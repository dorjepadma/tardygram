require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');

const { getPosts, getUser, getAgent, getPost, } = require('../db/data-helpers');

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

  it('gets post by id', async() => {
    const user = await getUser({ username: 'vixen' });
    const post = await getPost({ user: user._id });

    return getAgent()
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          user: user._id,
        });
      });
  });
  it('gets all posts', async() => {
    const posts = await getPosts();
    
    return getAgent()
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });
  it('updates a post by id', async() => {
    const user = await getUser({ username: 'vixen' });
    const post = await getPost({ user: user._id });
    
    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'When you leave your body recite Om Mani Padme Hum, a deity of light will guide you to the pure realms' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          updatedAt: expect.any(String),
          caption: 'When you leave your body recite Om Mani Padme Hum, a deity of light will guide you to the pure realms'
        });
      });
  });

  it('deletes a post', async() => {
    const user = await getUser({ username: 'vixen' });
    const post = await getPost({ user: user._id }); 
    return getAgent()
      .delete(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual(post);
      });
  });

});
