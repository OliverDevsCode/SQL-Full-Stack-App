# SQL Mini Full Stack App

A simple full-stack application using MySQL 8, Node.js and npm scripts to install, build, and run both server and client. This project is intended for local hosting and educational purposes only.

## Running Demo

I have seperated this repository across 2 servers to allow you to test it out:
  https://react-school-front-end.vercel.app/ - This is the client folder running via vercel

### Demo Login
  - Username: 1
  - Password: Test (Case Sensitive)
  - ⚠️ Demo Warning: This is a public demo intended for testing and educational purposes only. Do not enter any real or personal information (e.g. real names, passwords, or email addresses)

## Prerequisites

- [Node.js & npm](https://nodejs.org/) (v14+ recommended)
- [MySQL 8](https://dev.mysql.com/downloads/mysql/)

- Install the mySQL 8 and run the server
- Import the database from the docs folder [docs](./docs)
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
