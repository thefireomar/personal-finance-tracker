const mysql = require('mysql2/promise');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
  host: "gateway01.us-west-2.prod.aws.tidbcloud.com",
  port: "4000",
  user: "3CFyJuz37A6rmiC.root",
  password: "YOaBHnc5TVpgdpzf",
  database: "new_schema",
  ssl: {
    ca: fs.readFileSync('ca.pem')
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const commonPasswords = [
  '123456', 'password', 'qwerty', 'admin', 'test',
  'password123', '12345678', 'welcome', 'abc123'
];

async function tryDecodePassword(hash, email) {
  console.log(`\nTrying to decode password for ${email}...`);
  
  for (const testPass of commonPasswords) {
    const isMatch = await bcrypt.compare(testPass, hash);
    if (isMatch) {
      return testPass;
    }
  }
  return 'Unable to decode';
}

async function viewPasswords() {
  try {
    const [users] = await pool.query('SELECT email, password FROM users');
    
    console.log('\nUser Passwords (Development Only!):\n');
    console.log('----------------------------------------');
    
    for (const user of users) {
      const possiblePassword = await tryDecodePassword(user.password, user.email);
      console.log(`Email: ${user.email}`);
      console.log(`Hashed: ${user.password}`);
      console.log(`Possible Plain: ${possiblePassword}`);
      console.log('----------------------------------------');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

console.warn('\nWARNING: This script is for development purposes only!');
console.warn('Never use this in production or with real user data!\n');

viewPasswords();
