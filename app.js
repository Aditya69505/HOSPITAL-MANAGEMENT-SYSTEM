const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const docterRoute = require('./docterRoute');
const patientRoute = require('./patientRoute');

const port = 3000;


mongoose.connect('mongodb://localhost:27017/hms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

  app.use(cors());
  app.use(express.json());

app.use('/doctors', docterRoute);
app.use('/patients', patientRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at localhost:${port}`);
});
