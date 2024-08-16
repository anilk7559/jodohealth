const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add this line
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const users = [
        {
            name: 'Admin',
            emp_id: 'EMP-1',
            email: 'admin@gmail.com',
            user_name: 'admin',
            role_type: 'Admin',
            gender: 'male',
            phone: '7619850994',
            password: await bcrypt.hash('12345678', 10),
            user_status: 0,
            avatar: 'images/user-dummy-pic.png'
        },
        {
            name: 'Agency',
            emp_id: 'EMP-2',
            email: 'agency@gmail.com',
            user_name: 'Agency',
            role_type: 'Agency',
            gender: 'male',
            phone: '7619850995',
            password: await bcrypt.hash('12345678', 10),
            user_status: 0,
            avatar: 'images/user-dummy-pic.png'
        },
        {
            name: 'Lab',
            emp_id: 'EMP-3',
            email: 'lab@gmail.com',
            user_name: 'Lab',
            role_type: 'Lab',
            gender: 'male',
            phone: '7619850996',
            password: await bcrypt.hash('12345678', 10),
            user_status: 0,
            avatar: 'images/user-dummy-pic.png'

        }
    ];


    await User.insertMany(users);
    console.log('Users seeded');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedUsers();
