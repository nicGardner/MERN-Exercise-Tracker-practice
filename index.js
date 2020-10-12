const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRouter = require('./backend/routes/exercises')
const usersRouter = require('./backend/routes/users')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to the MongoDB, or the mock db if testing
const uri = process.env.ATLAS_URI;  //get the connection string from the .env file
if(process.env.NODE_ENV === 'test') { //if this is a test (this process.env variable is set by the test script)
  const Mockgoose = require('mockgoose').Mockgoose  //import mockgoose
  const mockgoose = new Mockgoose(mongoose) //wrap mongoose in mockgoose
  mockgoose.prepareStorage()  //get mockgoose ready
    .then(() => {
      mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });  //connect to mongoose, which is now wrapped inside mockgoose, so it is really the mock database that exists only temporarily in memory
    })
}
else{
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
}
const connection = mongoose.connection;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.use('/api/exercises', exerciseRouter)
app.use('/api/users', usersRouter)

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))
// Anything that doesn't match the other routes, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

module.exports = app