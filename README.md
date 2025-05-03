# SubDub - Subscription Tracker API

A RESTful API for tracking and managing subscription services.

## Overview

SubDub helps users track their recurring subscriptions, manage renewal dates, and monitor spending on subscription-based services.

## Features

- User authentication and account management
- Subscription tracking and management
- Renewal notifications
- Subscription analytics

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v16.20.1 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/jhin1m/subscription-tracker.git
cd subscription-tracker
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
Create `.env.development.local` file in the root directory with:
```
PORT=3000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/subdub
```

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user details
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user details
- `DELETE /api/v1/users/:id` - Delete user

### Subscriptions
- `GET /api/v1/subscriptions` - Get all subscriptions
- `GET /api/v1/subscriptions/:id` - Get subscription details
- `POST /api/v1/subscriptions` - Create new subscription
- `PUT /api/v1/subscriptions/:id` - Update subscription details
- `DELETE /api/v1/subscriptions/:id` - Delete subscription
- `GET /api/v1/subscriptions/user/:id` - Get all subscriptions by user id
- `PUT /api/v1/subscriptions/:id/cancel` - Cancel subscription
- `GET /api/v1/subscriptions/upcoming-renewals` - Get upcoming renewals

## License

MIT