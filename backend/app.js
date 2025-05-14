const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config(); // Load environment variables

const userRouter = require('./routes/userRouter');

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API routes
app.use('/api/users', userRouter);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route for React frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
