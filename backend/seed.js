const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/User'); // Adjust the path if needed
require('dotenv').config(); // To access environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany();
    console.log('Cleared existing users.');

    // Generate sample users
    const users = Array.from({ length: 10 }).map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number('##########'),
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      postalCode: faker.address.zipCode(),
      country: faker.address.country(),
      userNotes: faker.lorem.sentence(),
      password: 'password123', // Default password for testing
      dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    }));

    // Save users to the database
    await User.insertMany(users);
    console.log('Sample users added to the database.');

    mongoose.connection.close();
    console.log('Database connection closed.');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
