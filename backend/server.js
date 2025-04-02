const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const goalsRoutes = require('./routes/goals');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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





// Make pool available globally
app.locals.pool = pool;

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
