# Expense API - Node.js

This is a Node.js application built using Express and MySQL with Sequelize ORM.

## Stack

- Express: Fast, unopinionated, minimalist web framework for Node.js
- bcrypt: Password hashing library for securing user credentials
- mysql2: MySQL database driver for Node.js
- sequelize: Promise-based ORM for Node.js, compatible with MySQL
- uuid: Library for generating universally unique identifiers (UUIDs)
- jsonwebtoken: Library for creating and verifying JSON Web Tokens (JWT)

## Features

- CRUD for users: Manage user accounts, including registration, login, retrieval, update, and deletion.
- CRUD for expenses: Create, retrieve, update, and delete expenses.
- CRUD for fund_sources: Manage fund sources, such as bank accounts or payment methods.
- CRUD for budgets: Create, retrieve, update, and delete budget records.

## Prerequisites

- Node.js (version X.X.X)
- MySQL database

## Installation

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install`

## Configuration

1. Rename `.env.example` to `.env`.
2. Open `.env` and provide the necessary configuration for your MySQL database.

## Usage

1. Start the application: `npm start`
2. Access the application in your web browser at `http://localhost:3000`

## API Routes

- User Routes:
  - `POST /users/register`: Register a new user.
  - `POST /users/login`: Authenticate a user and generate a JWT token.
  - `GET /users/:id`: Get a user by ID.
  - `PUT /users/:id`: Update a user by ID.
  - `DELETE /users/:id`: Delete a user by ID.

- Expense Routes:
  - `POST /expenses`: Create a new expense.
  - `GET /expenses/:id`: Get an expense by ID.
  - `PUT /expenses/:id`: Update an expense by ID.
  - `DELETE /expenses/:id`: Delete an expense by ID.

- Fund Source Routes:
  - `POST /fund_sources`: Create a new fund source.
  - `GET /fund_sources/:id`: Get a fund source by ID.
  - `PUT /fund_sources/:id`: Update a fund source by ID.
  - `DELETE /fund_sources/:id`: Delete a fund source by ID.

- Budget Routes:
  - `POST /budgets`: Create a new budget.
  - `GET /budgets/:id`: Get a budget by ID.
  - `PUT /budgets/:id`: Update a budget by ID.
  - `DELETE /budgets/:id`: Delete a budget by ID.

Please refer to the API documentation or the source code for detailed request and response formats.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
