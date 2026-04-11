const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
app.use(cors());           // allow cross-origin requests
app.use(express.json());   // parse JSON request bodies

console.log('hello world')

app.get('/', (req, res) => res.json({ message: 'API running' }));



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB error:', err));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));