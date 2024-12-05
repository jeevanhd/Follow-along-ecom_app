# Follow-along Project

## Project Milestone 1

1. **User Authentication**:
   - Register and log in users.
2. **Product Management**:
   - Add, update, and retrieve product data.
3. **Order Handling**:
   - Manage customer orders

---

## Project Milestone 2

1. Setting up the **Frontend** and **Backend** dev environment
2. Created 2 main folders for frontend and backend

### Frontend Setup

- Created a react app
  ```bash
  npm create vite@latest Frontend
  ```
- Installed Node Dependencies
  ```bash
  npm i
  ```
  **or**
  ```bash
  npm install
  ```
- **Added Tailwind CSS for styling:**

  using the following commands

  ```bash
  npm install -D tailwindcss
  npx tailwindcss init
  ```

  Then added the following into index.css:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

- Created a **Login page**

### Backend Setup

- Initialized Backend Project
  ```bash
  npm init -y
  ```
- Added necessary dependencies
  ```bash
  npm i express
  npm i mongoose
  npm i cors
  npm i nodemon
  ```
- **Created Backend Structure:**

  Set up directories inside the **src** folder:

  ```bash
  mkdir Config controllers Middlewares Routes
  ```

  And also created a main file:

  ```bash
  index.js
  ```

## Project Milestone 3

### Connecting Backend and Database

- Created a **MongoDB Account** and created a new database cluster

- Set up of `.env` file for **environment variables** like database url , port, etc.

- Created a new file called `database.js` to connect the **backend** to the **database**

- Created a new file called `app.js` which sends the response to the client.

- Implemented basic error handling in `errorhandler.js` file

## Project Milestone 4

- Created a **User Model** using Mongoose to interact with the database

- Created **Middlewares**  and added a `multer.js` file to it 

- Created a **User Controller** to handle user related operations

- Created a **User Route** to handle user related requests

