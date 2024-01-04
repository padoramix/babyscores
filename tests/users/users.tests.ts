import { describe, expect } from '@jest/globals';
import * as request from 'supertest';
import { removeAll } from '../utils';
import app from '../../src/app';

beforeAll(async () => {
  // Empty all JSON DB
  removeAll();
});

describe('GET /users', () => {
  it('Should return an empty users list', async () => {
    const result = await request(app)
      .get('/users')
      .set('Accept', 'appliaction/json')
      .expect('Content-type', /json/)
      .expect(200);

    expect(result.users).toBe([]);
  });
});
