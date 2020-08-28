const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRouter = require('./backend/routes/exercises');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.use('/exercises', exerciseRouter);

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))
// Anything that doesn't match the other routes, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})