
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

app.use('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// Routes

app.use('/users', userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

