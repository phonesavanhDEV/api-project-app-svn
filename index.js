
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const middleware = require('./middleware/middlewareRoute');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');


// Middleware
app.use(express.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY],
  maxAge: 24 * 60 * 60 * 1000 // 1 day
}));
app.use(cors());


// app.use('/login', (req, res) => {
//   res.sendFile(__dirname + '/views/login.html');
// });

// app.use('/register', (req, res) => {
//   res.sendFile(__dirname + '/views/signup.html');
// })


// Routes

app.use('/users', userRoutes);
app.use(middleware);
// app.use('/home', middleware);
// app.use('/login', middleware);
// app.use('/register', middleware);

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

