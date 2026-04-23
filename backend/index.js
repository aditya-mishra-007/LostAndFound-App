const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes mounted perfectly to match PDF requirements [cite: 16, 17]
app.use('/api', require('./routes/auth')); // Mounts /api/register and /api/login
app.use('/api/items', require('./routes/item')); // Mounts /api/items

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));