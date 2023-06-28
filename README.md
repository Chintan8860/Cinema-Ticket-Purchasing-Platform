# Cinema Ticket Purchasing Platform

This project is a Cinema Ticket Purchasing Platform web API built with Node.js and TypeScript. It allows users to create cinemas with seats, purchase specific seats, and purchase the first two consecutive available seats in a cinema. The API is designed to handle concurrent requests and can scale to multiple servers.

## Requirements

- Node.js (v14 or higher)
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>

   ```

2. Install the dependencies:
   ```bash
    cd cinema-ticket-purchasing-platform
    npm install
   ```
3. Set up the MongoDB connection:
   Make sure MongoDB is running locally on the default port (27017) or connect cloud urls.
   Modify the MongoDB connection URL in the code if necessary (app.ts).
4. Build and start the server:

- Build the TypeScript code:
  ```bash
    npm run build
  ```
- Start the server:
  ```bash
  npm run start
  ```

## For API documentation

https://docs.google.com/document/d/1dFTzZCpSLVBOpP2RbG6Fcs3izEmZGyo4_2bLvtkbyX0/edit?usp=sharing
