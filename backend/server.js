const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const authRoutes = require('./routes/auth');
  
dotenv.config(); 

const app = express(); 

//middleware

app.use(express.json());
app.use(cors());

//routes

app.use('/api/auth', authRoutes);
  
// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}) 
  .then(() => console.log('Connected to MongoDB')) 
  .catch((error) => console.error('MongoDB connection error:', error)); 
  
// Start Server 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 