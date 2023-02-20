# A Simple Microservice App with Node.js, React.js and Express

> WIP

This is a simple microservice application built with Node.js, React.js and Express. It allows users to add post titles and comments, while comments containing the word "orange" are rejected. The application consists of 5 services and a react frontend each located in its own folder.

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

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

You will need to have Node.js and npm installed on your machine to run this application. You can download the latest version of Node.js from the official website: https://nodejs.org/

## Running the Services

The application consists of five microservices: post service, comments service, query service, moderation service, and an event bus. Each service is located in its own folder, and to run each service, you will need to navigate to the folder and run the following commands:

```bash
cd <service-folder>
npm install
npm dev # to start a development server
```

## Running the Frontend

1. Navigate to `client` directory
2. Run `npm install` to install dependencies
3. Run `npm run start` to start a local development server

## Built With

- [Node.js](https://nodejs.org) - JavaScript runtime
- [Express](https://expressjs.com) - Node.js web application framework
- [React.js](https://reactjs.org) - JavaScript library for building user interfaces
- [Bootstrap](https://getbootstrap.com) - CSS framework

## In-Memory Database

The application uses a JavaScript object as an in-memory database to store the post titles and comments. This allows for quick and easy storage and retrieval of data without the need for a persistent database.

## Note

Please note that this application is for learning purposes only and is not intended for production use. The in-memory database may not be suitable for larger applications and a persistent database such as MongoDB should be used instead.
