# Follow-along Project

## project Milestone 1

1. User Authentication: Register and log in users.
2. Product Management: Add, update, and retrieve product data.
3. Order Handling: Manage customer orders

## project Milestone 2

1. Setting up the Frontend and Backend dev environment
2. Created 2 main folders for frontend and backend

### In Frontend folder, created the following files and folders:

- Created a react app using `npm create vite@latest Frontend`
- Set up the nodes using `npm i` or `npm install`
- Added Tailwind CSS for styling using the following commands
  ```
  npm install -D tailwindcss
  npx tailwindcss init
  ```
- Then added the following into index.css:

  ```
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

- Created a **Login page**

### In Backend folder, created the following files and folders:

- Created a new Backend project using `npm init -y`
- Added express, mongoose, cors and nodemon using the following commands
  ```
  npm i express
  npm i mongoose
  npm i cors
  npm i nodemon
  ```
- Added Some directory into **src** using the following commad
  ```
  mkdir Config controllers Middlewares Routes
  ```
  And also added `index.js`
