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
  touch index.js
  ```

## Project Milestone 3

### Connecting Backend and Database

- Created a **MongoDB Account** and created a new database cluster

- Set up of `.env` file for **environment variables** like database url , port, etc.

- Created a new file called `database.js` to connect the **backend** to the **database**

- Created a new file called `app.js` which sends the response to the client.

- Implemented basic error handling in `errorhandler.js` file

## Project Milestone 4

- **Creating the User Model**

  1. Created a `models` folder and added a `User.model.js` file.

  2. Defined the User Schema in `User.js`

- **Adding Middlewares**

  1. Installed multer for file handling

     ```bash
     npm install multer
     ```

  2. Created a `middlewares` folder and added a `multer.js` file.

  3. Configured Multer in `middlewares/multer.js`

- **Creating the User Controller**

  1. Created a `controllers` folder and added a `userController.js` file.

  2. Wrote functions to handle user operations like creating, reading, and updating user data:

- **Setting Up User Routes**

  1. Created a `routes` folder and added a `userRoute.js file`.

  2. Defined routes to handle user-related requests

## Project Milestone 5

- **Creating the Sign-up Page**

  1. Created a new `Signup.js` file in the `src` folder.

  2. Added a form with fields for:

     - Name
     - Email
     - Password
     - File Upload

  3. Set up `useState` to manage form data and handled form submission.

- **Adding Form Validation**

  1. Created a `validation.js` file in the `src` folder.

  2. Added functions to validate fields, e.g., checking if fields are empty or if the email format is correct.

  3. Used the validation functions in the `Signup.js` file to show error messages when users submit invalid data.

- **Setting Up Routing**

  1. Updated `src/index.js` to use `BrowserRouter`:

     ```jsx
     <BrowserRouter>
       <App />
     </BrowserRouter>
     ```

  2. Added `/signup` and `/login` routes in `App.js`

     ```jsx
     <Routes>
       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
     </Routes>
     ```

## Project Milestone 6

- **JWT Authentication and Email Verification**

  - Installing jsonwebtoken

    ```bash
    npm install jsonwebtoken
    ```

- Adding JWT Authentication

  - Generating a JWT Token

  - Protecting Routes with JWT

- Adding Email Verification in userController.js

  - Generating a Verification Token

  - Verifying the Email Token

  - Sending Verification Email After Signup

## Project Milestone 7

- **Created Two Routes: Signup and Login**

  ### For Signup

  - Extracting User Data from the Request Body:

    ```javascript
    const { name, email, password } = req.body;
    ```

  - Checking if the User Already Exists in the Database:
    - **If Yes**: Return a message indicating the user is already present and suggest direct login.
    - **If No**:
      - Hash the password using libraries like `bcrypt.js` or `argon2.js`.
      - Create a new user and store their `name`, `email`, and hashed `password` in the database.

  ### For Login

  - Extracting User Data from the Request Body:

    ```javascript
    const { email, password } = req.body;
    ```

  - Validating User Credentials:
    - **If User Exists and Password Matches**:
      - Generate a token and send it back as cookies.
    - **If Not**: Return a message prompting the user to sign up first.
