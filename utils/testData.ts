// Test data for different test scenarios using faker-js
import { faker } from '@faker-js/faker';

// Generate dynamic fake data using faker
const generateValidFormData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
  mobileNumber: faker.string.numeric(10), // 10 digit mobile number
  dateOfBirth: faker.date.between({ from: '1980-01-01', to: '2005-12-31' }).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/,/g, ''),
  subjects: faker.helpers.arrayElements(['Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi'], { min: 1, max: 3 }),
  hobbies: faker.helpers.arrayElements(['Sports', 'Reading', 'Music'], { min: 1, max: 3 }),
  currentAddress: faker.location.streetAddress({ useFullAddress: true }),
  state: faker.helpers.arrayElement(['NCR', 'Haryana', 'Uttar Pradesh', 'Rajasthan']),
  city: faker.helpers.arrayElement(['Delhi', 'Gurgaon', 'Karnal', 'Agra', 'Jaipur'])
});

// Static data for consistent testing
const validFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  mobileNumber: '1234567890',
  dateOfBirth: '15 Jul 1990',
  subjects: ['Maths', 'Physics'],
  hobbies: ['Sports', 'Reading'],
  currentAddress: '123 Main Street, New York, NY 10001',
  state: 'NCR',
  city: 'Delhi'
};

const minimalFormData = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  gender: 'Female',
  mobileNumber: '9876543210'
};

const invalidFormData = {
  firstName: '',
  lastName: '',
  email: 'invalid-email',
  gender: 'Male',
  mobileNumber: '123' // Invalid mobile number (too short)
};

const testUsers = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@test.com',
    gender: 'Female',
    mobileNumber: '5551234567',
    dateOfBirth: '20 Mar 1995',
    subjects: ['English'],
    hobbies: ['Music'],
    currentAddress: '456 Oak Avenue, Los Angeles, CA 90210',
    state: 'Haryana',
    city: 'Karnal'
  },
  {
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@test.com',
    gender: 'Male',
    mobileNumber: '5559876543',
    dateOfBirth: '10 Dec 1988',
    subjects: ['Chemistry', 'Biology'],
    hobbies: ['Sports', 'Music', 'Reading'],
    currentAddress: '789 Pine Road, Chicago, IL 60601',
    state: 'Uttar Pradesh',
    city: 'Agra'
  }
];

const boundaryTestData = {
  // Test boundary values
  longName: 'A'.repeat(100), // Very long name
  shortName: 'A', // Single character name
  specialCharacters: 'John-O\'Connor Jr.',
  unicodeCharacters: 'Jöhn Müller',
  minMobileNumber: '1234567890',
  maxMobileNumber: '9876543210'
};

module.exports = {
  generateValidFormData, // Dynamic faker data generator
  validFormData,
  minimalFormData,
  invalidFormData,
  testUsers,
  boundaryTestData
};
