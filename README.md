# Backend

Welcome to the backend section of our project! Here you will find details about the API endpoints, how to set up the backend locally, and other relevant information.

## API Details

### User Routes

- **GET /api/user/**
  - Description: Test route to check if user route is working.
  - Example: `http://localhost:4000/api/user/`

- **POST /api/user/signup**
  - Description: Register a new user.
  - Example: `http://localhost:4000/api/user/signup`

- **POST /api/user/login**
  - Description: Login an existing user.
  - Example: `http://localhost:4000/api/user/login`

- **POST /api/user/logout**
  - Description: Logout the current user.
  - Example: `http://localhost:4000/api/user/logout`

- **DELETE /api/user/delete**
  - Description: Delete user account.
  - Example: `http://localhost:4000/api/user/delete`

### Task Routes

- **POST /api/task/getall**
  - Description: Fetch all tasks.
  - Example: `http://localhost:4000/api/task/getall`

- **GET /api/task/getone/:id**
  - Description: Fetch task by ID.
  - Example: `http://localhost:4000/api/task/getone/1`

- **POST /api/task/create**
  - Description: Create a new task.
  - Example: `http://localhost:4000/api/task/create`

- **PUT /api/task/update/:id**
  - Description: Update task by ID.
  - Example: `http://localhost:4000/api/task/update/1`

- **POST /api/task/remove/:id**
  - Description: Delete task by ID.
  - Example: `http://localhost:4000/api/task/remove/1`

### Authentication

The authentication for user routes uses JWT (JSON Web Tokens) and includes endpoints for signup, login, logout, and delete.

### Setting Up

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
