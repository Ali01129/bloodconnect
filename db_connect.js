const express = require('express');
const mongoose = require('mongoose');
const forDonors = require('./routes/getdonors');
const cors = require('cors');
const path = require("path");


mongoose.connect("mongodb+srv://ali:alinawaz1@cluster0.pc6svvj.mongodb.net/bloodconnect?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();
const port = 3000;
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());
//for running frontend with backend
// making frontend run with nodemon
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
// Route for /api/sharenote
app.use('/api/getdonor', forDonors);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});