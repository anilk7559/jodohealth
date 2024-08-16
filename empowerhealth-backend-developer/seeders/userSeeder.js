const Sequelize = require('sequelize');
const sequelize = new Sequelize('u652592452_jodohealth', 'u652592452_jodohealth', 'Nr]D/1a2:', {
    host: 'srv1492.hstgr.io',
    dialect: 'mysql'
});

const { DataTypes } = Sequelize;
const User = require('../models/users')(sequelize, DataTypes);
const bcrypt = require('bcrypt');

const seedUsers = async () => {
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

    try {
        // Then drop the users table
        await User.drop();

        // await User.sync({ force: true });
        // Sync the models
        await sequelize.sync({ force: true });
        await User.bulkCreate(users);
        console.log('Users have been seeded.');
    } catch (error) {
        console.error('Failed to seed users:', error);
    }
};

seedUsers();
