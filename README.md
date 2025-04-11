# Student Job Tracker

A full-stack MERN (MongoDB, Express.js, React, Node.js) application that helps students keep track of their job applications.

## Features

- Add, update, delete job applications
- Track job status
- View jobs in a list format
- Bulk job form support
- Clean and modular code

## Project Structure

student-job-tracker/
├── backend/
│   ├── models/
│   ├── routers/
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── components/
│   │       ├── BulkJobFrom.js
│   │       ├── JobForm.js / JobForm.css
│   │       ├── JobItem.js / JobItem.css
│   │       └── JobList.js
│   └── package.json
├── package.json (root)
└── yarn.lock

## Prerequisites

- Node.js and Yarn installed
- MongoDB running locally or provide a MongoDB Atlas URI

## Environment Variables (Backend)

Create a .env file in the /backend directory:

```env
MONGO_URL=mongodb+srv://chetanyaadepu:Chetan%400903@cluster0.onayhld.mongodb.net/jobTracker?retryWrites=true&w=majority&appName=Cluster0
PORT=5000

git clone https://github.com/itachi200218/student-job-tracker.git
cd student-job-tracker

# Install frontend dependencies
cd frontend
yarn

# Install backend dependencies
cd ../backend
yarn


# Frontend
cd frontend
yarn start

# Backend
cd backend
yarn start


---

Let me know if you want to add screenshots or deployment steps to Vercel/Render/Netlify!
