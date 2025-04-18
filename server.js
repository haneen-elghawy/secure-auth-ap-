require('dotenv').config();
const express = require('express');
const app = express();

const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
