# A Simple Microservice App with Node.js, React.js and Express

This is a simple microservice application built with Node.js, React.js and Express. It allows users to add post titles and comments, while comments containing the word "orange" are rejected. The application consists of 5 services and a react frontend each located in its own folder. 

## Technologies Used
- Node.js
- Express
- React.js
- JavaScript object (as in-memory database)

## Features
- Add post titles
- Add comments
- Rejection of comments containing the word "orange"

## Services
- Post service to create posts (running on port 8001)
- Comments service to add comments (running on port 8002)
- Query service to fetch all comments and posts together and display them on frontend. (running on port 8003)
- Moderation service to moderate comments (running on port 8004)
- A Simple event bus (running on port 8005)

## Running the App
To run the app locally, follow these steps:

1. Clone the repository to your local machine
2. For each service, navigate to its folder and run npm install to install the necessary dependencies
3. Start each service by running npm start in the terminal
4. To start the react frontend navigate to client directory and run npm install to install the necessary dependencies followed by npm start to start a dev server.
5. Open your browser and go to `http://localhost:3000/` to view the application


## In-Memory Database

The application uses a JavaScript object as an in-memory database to store the post titles and comments. This allows for quick and easy storage and retrieval of data without the need for a persistent database.

## Note
Please note that this application is for learning purposes only and is not intended for production use. The in-memory database may not be suitable for larger applications and a persistent database such as MongoDB should be used instead.