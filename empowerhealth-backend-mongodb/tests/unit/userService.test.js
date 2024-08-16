const User = require('../../models/userModel');

describe('User Model', () => {
  it('should create a user', async () => {
    const user = await User.create({ name: 'Test User', email: 'test@example.com', password: 'testpassword' });
    expect(user.name).toBe('Test User');
  });
});
