const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup for local frontend + Render
app.use(cors({
  origin: ['http://localhost:5173', 'https://freelance-backend-oulv.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
  res.send('🌐 Backend server is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
