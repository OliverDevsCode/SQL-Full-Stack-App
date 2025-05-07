# SQL Mini Full Stack App

A simple full-stack application using MySQL 8, Node.js and npm scripts to install, build, and run both server and client.

## Prerequisites

- [Node.js & npm](https://nodejs.org/) (v14+ recommended)
- [MySQL 8](https://dev.mysql.com/downloads/mysql/)

- Install the mySQL 8 and run the server
- Import the data base from the docs folder
## Installation

Install the server with:
```bash
npm run install-all
```
Add an env file in server folder to connect to database and create JWTs- I have added an example version in the codebase for you to use to test if needed.
```env
JWT_SECRET= yoursecretkey
DB_HOST = localhost
DB_USER = xxx
DB_PASSWORD = xxxx
DB_NAME = school
```

## Start Server
Start the server with:
```bash
npm run start
```
