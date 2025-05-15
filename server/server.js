const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require('./config/config');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/auth');
const doctorRoutes = require('./src/routes/doctors');
const appointmentRoutes = require('./src/routes/appointments');

dotenv.config();
const app = express();
//enable cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
  }));
// parse json data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// define port to running server 
const port = process.env.PORT || 3030;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);


//default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// port listner
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
   
});
