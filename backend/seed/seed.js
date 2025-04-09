// Import dependencies
const mongoose = require('mongoose');
const Job = require('./models/Job');  // Import your Job model

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/jobTracker', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Predefined job data
const jobData = [
  { company: 'Google', role: 'Frontend Developer', status: 'Applied', appliedDate: new Date('2024-04-01'), link: 'https://google.com' },
  { company: 'Amazon', role: 'Backend Developer', status: 'Interview', appliedDate: new Date('2024-04-02'), link: 'https://amazon.com' },
  { company: 'Facebook', role: 'Data Scientist', status: 'Offer', appliedDate: new Date('2024-04-03'), link: 'https://facebook.com' },
  { company: 'Microsoft', role: 'Software Engineer', status: 'Applied', appliedDate: new Date('2024-04-04'), link: 'https://microsoft.com' },
  { company: 'Apple', role: 'UI/UX Designer', status: 'Rejected', appliedDate: new Date('2024-04-05'), link: 'https://apple.com' },
  { company: 'Tesla', role: 'Machine Learning Engineer', status: 'Applied', appliedDate: new Date('2024-04-06'), link: 'https://tesla.com' },
  { company: 'Twitter', role: 'Product Manager', status: 'Interview', appliedDate: new Date('2024-04-07'), link: 'https://twitter.com' },
  { company: 'Netflix', role: 'Backend Engineer', status: 'Offer', appliedDate: new Date('2024-04-08'), link: 'https://netflix.com' },
  { company: 'Spotify', role: 'Frontend Developer', status: 'Applied', appliedDate: new Date('2024-04-09'), link: 'https://spotify.com' },
  { company: 'Slack', role: 'Software Engineer', status: 'Interview', appliedDate: new Date('2024-04-10'), link: 'https://slack.com' },
  { company: 'Snapchat', role: 'Data Analyst', status: 'Offer', appliedDate: new Date('2024-04-11'), link: 'https://snapchat.com' },
  { company: 'Uber', role: 'Full Stack Developer', status: 'Applied', appliedDate: new Date('2024-04-12'), link: 'https://uber.com' },
  { company: 'Airbnb', role: 'Backend Developer', status: 'Rejected', appliedDate: new Date('2024-04-13'), link: 'https://airbnb.com' },
  { company: 'Shopify', role: 'Frontend Developer', status: 'Applied', appliedDate: new Date('2024-04-14'), link: 'https://shopify.com' },
  { company: 'Square', role: 'DevOps Engineer', status: 'Offer', appliedDate: new Date('2024-04-15'), link: 'https://square.com' },
  { company: 'Dropbox', role: 'Product Designer', status: 'Interview', appliedDate: new Date('2024-04-16'), link: 'https://dropbox.com' },
  { company: 'Adobe', role: 'Data Engineer', status: 'Applied', appliedDate: new Date('2024-04-17'), link: 'https://adobe.com' },
  { company: 'GitHub', role: 'Software Developer', status: 'Rejected', appliedDate: new Date('2024-04-18'), link: 'https://github.com' },
  { company: 'Oracle', role: 'Cloud Engineer', status: 'Applied', appliedDate: new Date('2024-04-19'), link: 'https://oracle.com' },
  { company: 'Zoom', role: 'Security Engineer', status: 'Offer', appliedDate: new Date('2024-04-20'), link: 'https://zoom.com' }
];

// Insert predefined job data into the database
async function insertJobData() {
  try {
    const result = await Job.insertMany(jobData);
    console.log('Job data successfully inserted:', result);
    mongoose.connection.close();  // Close the connection after inserting the data
  } catch (err) {
    console.error('Error inserting job data:', err);
    mongoose.connection.close();
  }
}

// Call the insertJobData function
insertJobData();
