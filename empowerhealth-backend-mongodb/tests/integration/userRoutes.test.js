const request = require('supertest');
const app = require('../../app');
const User = require('../../models/userModel');

describe('User Routes', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should get all users', async () => {
    await User.create({ name: 'Test User', email: 'test@example.com', password: 'testpassword' });

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
