const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate a random secret
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Update .env file
const updateEnvFile = (secret) => {
  const envPath = path.join(__dirname, '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const updatedContent = envContent.replace(
    /JWT_SECRET=.*/,
    `JWT_SECRET=${secret}`
  );
  fs.writeFileSync(envPath, updatedContent);
};

const secret = generateSecret();
updateEnvFile(secret);
console.log('New JWT secret generated and updated in .env file');
