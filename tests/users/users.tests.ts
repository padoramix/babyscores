import { describe, expect } from '@jest/globals';
import * as request from 'supertest';
import * as express from 'express';
import { User, userRouter } from '../../src/models/users';
import { removeAll } from '../utils';
// import app from '../../src/app';

let server;
const app = express();

beforeAll(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', userRouter);

  server = app.listen(7500, () => {
    console.log('Server is listening on port 7000');
  });
  // Empty all JSON DB
  removeAll();
});

afterEach(async () => {
  // Do something after each tests
  // console.log('App : ', app);
  // await server.close();
});

afterAll(async () => {
  // Do something after all tests passes
  // Avoiding jest open handle error
  await server.close();
});

// Insert Users
// POST USERS
describe('POST /users', () => {
  it('Should accept to insert a new user', async () => {
    const payload = {
      username: 'Test user',
      email: 'testuser@gmail.com',
      password: 'chiwawa',
      avatar: 'db/avatars/maite.png',
    } as User;

    const { body } = await request(app)
      .post('/users')
      .send(payload)
      .set('Accept', 'appliaction/json')
      .expect('Content-type', /json/)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(String),
      username: 'Test user',
      email: 'testuser@gmail.com',
      password: 'chiwawa',
      avatar: 'db/avatars/maite.png',
    });
  });
});

// GET USERS
describe('GET /users', () => {
  it('Should return an empty users list', async () => {
    const result = await request(app)
      .get('/users')
      .set('Accept', 'appliaction/json')
      .expect('Content-type', /json/)
      .expect(200);

    // console.log(result);

    expect(result.users).toBe([]);
  });
});

// GET USER/:id
