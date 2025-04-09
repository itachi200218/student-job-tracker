const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jobRoutes = require('./routers/jobRouters');
const Job = require('./models/job');  // Import the Job model

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);

app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
    
    // Predefined job data to insert into the database
    const additionalJobData = [
      { name: 'Alex Morgan', company: 'Reddit', role: 'Software Engineer', status: 'Applied', appliedDate: new Date('2024-04-21'), link: 'https://reddit.com' },
      { name: 'Chris Johnson', company: 'Spotify', role: 'Data Scientist', status: 'Interview', appliedDate: new Date('2024-04-22'), link: 'https://spotify.com' },
      { name: 'Taylor Brown', company: 'Stripe', role: 'Backend Developer', status: 'Offer', appliedDate: new Date('2024-04-23'), link: 'https://stripe.com' },
      { name: 'Jordan Lee', company: 'Slack', role: 'Frontend Developer', status: 'Applied', appliedDate: new Date('2024-04-24'), link: 'https://slack.com' },
      { name: 'Morgan Harris', company: 'Zoom', role: 'Full Stack Developer', status: 'Interview', appliedDate: new Date('2024-04-25'), link: 'https://zoom.com' },
      { name: 'Patricia Turner', company: 'Salesforce', role: 'UI/UX Designer', status: 'Offer', appliedDate: new Date('2024-04-26'), link: 'https://salesforce.com' },
      { name: 'Quinn White', company: 'Pinterest', role: 'Data Analyst', status: 'Rejected', appliedDate: new Date('2024-04-27'), link: 'https://pinterest.com' },
      { name: 'Evelyn Scott', company: 'Snapchat', role: 'Software Developer', status: 'Applied', appliedDate: new Date('2024-04-28'), link: 'https://snapchat.com' },
      { name: 'Ian Davis', company: 'GitHub', role: 'Product Manager', status: 'Offer', appliedDate: new Date('2024-04-29'), link: 'https://github.com' },
      { name: 'Ava Thompson', company: 'Dropbox', role: 'Machine Learning Engineer', status: 'Interview', appliedDate: new Date('2024-04-30'), link: 'https://dropbox.com' },
      { name: 'Oliver White', company: 'Square', role: 'Backend Engineer', status: 'Applied', appliedDate: new Date('2024-05-01'), link: 'https://square.com' },
      { name: 'Amelia Clark', company: 'Adobe', role: 'Cloud Engineer', status: 'Rejected', appliedDate: new Date('2024-05-02'), link: 'https://adobe.com' },
      { name: 'James Wilson', company: 'Uber', role: 'Data Scientist', status: 'Applied', appliedDate: new Date('2024-05-03'), link: 'https://uber.com' },
      { name: 'Ella Harris', company: 'Airbnb', role: 'DevOps Engineer', status: 'Offer', appliedDate: new Date('2024-05-04'), link: 'https://airbnb.com' },
      { name: 'Lucas King', company: 'Shopify', role: 'Full Stack Developer', status: 'Interview', appliedDate: new Date('2024-05-05'), link: 'https://shopify.com' },
      { name: 'Sophia Turner', company: 'Oracle', role: 'Backend Developer', status: 'Applied', appliedDate: new Date('2024-05-06'), link: 'https://oracle.com' },
      { name: 'Daniel Green', company: 'Tesla', role: 'Security Engineer', status: 'Rejected', appliedDate: new Date('2024-05-07'), link: 'https://tesla.com' },
      { name: 'Lily Jackson', company: 'Microsoft', role: 'Product Designer', status: 'Offer', appliedDate: new Date('2024-05-08'), link: 'https://microsoft.com' },
      { name: 'Ethan Mitchell', company: 'Facebook', role: 'Cloud Engineer', status: 'Interview', appliedDate: new Date('2024-05-09'), link: 'https://facebook.com' },
      { name: 'Charlotte Walker', company: 'Amazon', role: 'Machine Learning Engineer', status: 'Applied', appliedDate: new Date('2024-05-10'), link: 'https://amazon.com' }
    ];
    
    // Remove duplicates before inserting
    async function removeDuplicatesAndInsertData() {
      try {
        // Remove existing duplicate jobs from the database based on company, role, and name
        await Job.aggregate([
          {
            $group: {
              _id: { company: "$company", role: "$role", name: "$name" },
              count: { $sum: 1 },
              docs: { $push: "$_id" }
            }
          },
          {
            $match: {
              count: { $gt: 1 }
            }
          }
        ])
        .then(async (duplicates) => {
          // For each group of duplicates, remove all but one
          for (let duplicate of duplicates) {
            duplicate.docs.shift();  // Keep one, remove others
            await Job.deleteMany({ _id: { $in: duplicate.docs } });  // Remove the duplicates
            console.log(`Removed ${duplicate.docs.length} duplicates for company: ${duplicate._id.company}`);
          }
        });

        // Insert predefined job data into the database
        const result = await Job.insertMany(jobData);
        console.log('Job data successfully inserted:', result);
        mongoose.connection.close();  // Close the connection after inserting the data
      } catch (err) {
        console.error('Error removing duplicates or inserting job data:', err);
        mongoose.connection.close();
      }
    }

    removeDuplicatesAndInsertData();  // Call the removeDuplicatesAndInsertData function
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
