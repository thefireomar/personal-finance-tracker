# Personal Finance Tracker

A full-stack web application for managing personal finances, tracking expenses, and setting financial goals.

## Features

- User authentication (register/login)
- Transaction management (add, edit, delete)
- Financial goals tracking
- Expense categorization
- Progress tracking for savings goals

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: TiDB Cloud (MySQL compatible)
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- TiDB Cloud account
- SSL certificate (ca.pem file)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory with:
```
PORT=5000
JWT_SECRET=your-secret-key
```

4. Database setup:
- Place your `ca.pem` file in the backend directory
- Create required tables:
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  target_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  category VARCHAR(255),
  deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Access the application at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - User login

### Transactions
- GET `/api/transactions/user/:userId` - Get user's transactions
- POST `/api/transactions` - Add new transaction
- PUT `/api/transactions/:id` - Update transaction
- DELETE `/api/transactions/:id` - Delete transaction

### Goals
- GET `/api/goals/user/:userId` - Get user's goals
- POST `/api/goals` - Create new goal
- PUT `/api/goals/:id/progress` - Update goal progress
- DELETE `/api/goals/:id` - Delete goal

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js Documentation
- Node.js Documentation
- TiDB Cloud Documentation
