require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'vixen', password: 'strawberry Jam', profilePhotoUrl: 'https://picsum.photos/200/300' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'vixen',
          profilePhotoUrl: 'https://picsum.photos/200/300',
          __v: 0
        });
      });
  });
  it('logs in a user', async() => {
    await User.create({ username: 'vixen', password: 'Strawberry Jam', profilePhotoUrl: 'https://picsum.photos/200/300' });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'vixen', password: 'Strawberry Jam', profilePhotoUrl: 'https://picsum.photos/200/300' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'vixen',
          profilePhotoUrl: 'https://picsum.photos/200/300',
          __v: 0
        });
      });
  });
});
