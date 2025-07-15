const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/contactRoutes'));


app.get('/', (req, res) => {
  res.send('🌐 Backend server is running successfully!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
