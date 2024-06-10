# TASK

Create an application which mantains the user sessions after login/register with validations on backend to prevent from any kind of SQL injections or XSS.

## Tech Stack 
- Node.js with Express
- ReactJS
- Tailwind CSS
- Database 
  - MongoDB 
  - DB Name: "mern-assignment"

## How to Run
- Clone the repository
- Open terminal and install the node packages through ```npm install```. Do same by opening another terminal and navigating to backend directory to install dependencies to start backend server
- Run both servers on different terminals using ```npm start``` command.

## Endpoints

### Create New User "/createUser"
- This endpoint is used to register new user
- Input Parameters:
  - User Name (required)
  - Email (required)
  - Password (required) 
- All the above parameters will go through a validation check before the data is saved on backend
- It will return the user data along with a cookie

### Login User "/login"
- This endpoint is used to login by the existing user
- Input Parameters:
  - Email (required)
  - Password (required) 
- All the above parameters will go through a validation check before the data is fetched from database on backend
- It will return the user data along with a cookie

### Cookie is stored as ```user```  with JWT token retrieved from backend and the loggedIn user's data for ```24hours```.
