# Student Job Tracker

A full-stack MERN (MongoDB, Express.js, React, Node.js) application that helps students keep track of their job applications.

## Deployed Links

- *Frontend:* [https://student-job-tracker-gray.vercel.app](https://student-job-tracker-gray.vercel.app)
- *Backend (API):* [https://student-job-tracker-1-q8rh.onrender.com](https://student-job-tracker-1-q8rh.onrender.com)

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
AI Tools Used

I used ChatGPT during the development process to:
	•	Generate boilerplate code for Express.js routes and MongoDB Mongoose schema
	•	Assist in creating filtering and update logic
	•	Write the initial version of the README file
	•	Get help with optimizing the frontend React components
	•	Validate my JavaScript DSA solution (duplicate application detection)

After using ChatGPT, I made manual edits to fine-tune the logic, match the UI/UX with my own ideas, and ensure full functionality.

AI tools helped me work faster, but I ensured full understanding and customization of all code.

## Part 4: DSA Problem – Detect Duplicate Applications

This is a simple JavaScript function that detects duplicate job applications based on case-insensitive comparison of company and role.

*File Location:* detect-duplicates.js

```javascript
function findDuplicateApplication(applications) {
  const seen = new Set();

  for (const app of applications) {
    const key = `${app.company.toLowerCase()}-${app.role.toLowerCase()}`;
    if (seen.has(key)) {
      return { duplicate: app }; // Return the duplicate application object
    }
    seen.add(key);
  }

  return null; // No duplicate found
}

// Example usage
const apps = [
  { company: "Google", role: "SDE Intern" },
  { company: "google", role: "SDE Intern" },
  { company: "Amazon", role: "Backend" }
];

const result = findDuplicateApplication(apps);
if (result) {
  console.log("Duplicate found:", result.duplicate);
} else {
  console.log("No duplicates found.");
}
