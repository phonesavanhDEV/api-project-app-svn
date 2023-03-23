// // ramdom key api
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);


//genarate sha-256
const crypto = require('crypto');

const url = 'http://165.22.51.189:3000';
const hash = crypto.createHash('sha256');
hash.update(url);
const hashKey = hash.digest('hex');

console.log(hashKey);


// //test
// const crypto = require('crypto');

// // Hash the user's password using SHA-256
// function hashPassword(password) {
//   const hash = crypto.createHash('sha256');
//   hash.update(password);
//   return hash.digest('hex');
// }

// // API endpoint for user login
// app.post('/user/login', async (req, res) => {
//   const { username, password } = req.body;

//   // Hash the password before checking it against the stored hash
//   const hashedPassword = hashPassword(password);

//   // Check the hashed password against the stored hash for this username
//   const user = await User.findOne({ username });
//   if (!user || user.password !== hashedPassword) {
//     return res.status(401).send('Invalid username or password');
//   }

//   // Login successful
//   return res.send('Login successful');
// });
