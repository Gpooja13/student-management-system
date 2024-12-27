# Student Management System

A **Student Management System** is a web application that enables the management and organization of student data. This system allows for adding, updating, viewing, and deleting student records. It provides a user-friendly interface to help institutions and administrators keep track of student information efficiently.

## Tech Stack

- **Frontend**: React.js
  - State management with React hooks
  - React Router for navigation
  - Axios for API requests
  - Tailwind CSS for styling
- **Backend**: Node.js, Express.js
  - RESTful API for managing student records
  - JWT-based authentication
- **Database**: MongoDB database for storing student records
- **Authentication**: JWT (JSON Web Tokens)
  - Secure login and session management

## Installation

### Prerequisites

Before getting started, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/) or use MongoDB Atlas for cloud database
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Gpooja13/student-management-system.git
   cd student-management-system
   ```

2. **Install dependencies**:

   For both frontend and backend, you need to install dependencies.

   - **Backend**:

     ```bash
     npm install
     ```

   - **Frontend**:

     ```bash
     cd frontend
     npm install
     ```

3. **Set up environment variables**:

   Create a `.env` file in the backend folder and add the following:

   ```
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the backend**:

   Navigate to the backend directory and run the following command:

   ```bash
   npm run dev
   ```

5. **Start the frontend**:

   Navigate to the frontend directory and run:

   ```bash
   npm start
   ```

6. The system should now be live at [http://localhost:3000](http://localhost:3000).


## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Here are some ways you can help:

- Add new features or improve existing ones.
- Fix bugs and improve code quality.
- Write tests and documentation.
