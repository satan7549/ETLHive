# Login & Lead Management Project

This project is an Login/signup & Lead Management application where users can log in, manage leads.

## Deployment

- **Backend**: [https://etlhive-backend.onrender.com/](https://etlhive-backend.onrender.com/)
- **Frontend**: [https://etl-hive-frontend.vercel.app/](https://etl-hive-frontend.vercel.app/)

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - JWT Authentication
  - MongoDB
  - reCAPTCHA (v2 Captcha)

- **Frontend**:
  - React
  - Redux
  - Chakra UI

## Features

- **User Authentication**:
  - Users Can signup 
  - Users can log in and log out.
  - Users can forgot password.

- **Lead Management**:
  - Each Lead Card has Email, Name, Number, Products .
  - User can View, Update, Delete, Short by name and search lead.

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env

    PORT=<your-port || 3000>
    MongoDB_URL=<your-mongodb-url>
    JWT_SECRET_KEY=<your-jwt-secret-key>
    JWT_SECRET_KEY_EXPIRE=<according to you>
    EMAIL_SERVICE=<your-service>
    EMAIL_USERNAME=<your-email-user-name>
    EMAIL_PASSWORD=<you-email-service-password>
    EMAIL_FROM=<sender-mail>
    CLIENT_BASE_URL=<your-own>
    ```

4. **Start the backend server:**

    ```bash
    npm start
    ```

5. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6. **Set up environment variables:**

    Create a `.env.local` file in the `frontend` directory and add the following:

    ```env

    REACT_APP_CAPTCHA_SITE_KEY=<your-captcha-key>
    REACT_APP_BACKEND_BASE_URL=<your-backendurl>
    
    ```

7. **Start the frontend development server:**

    ```bash
    npm start
    ```

## Contributing

Feel free to submit issues and pull requests if you have suggestions for improvements or bug fixes.


