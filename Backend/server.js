const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
app.use(cors());
 
app.use(express.json());
console.log('hello world')   
app.get('/', (req, res) => res.json({ message: 'API running' }));
// Routes

app.use('/auth', require('./routes/userRoutes'))
app.use('/donations', require('./routes/donationRoutes'))
app.use('/claims',require('./routes/claimRoutes'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB error:', err));
 app.listen(PORT, () => console.log(`Server on port ${PORT}`));


