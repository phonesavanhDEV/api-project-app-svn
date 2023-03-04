
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const axios = require('axios');

// async function getAllUsers(req, res) {
//   try {
//     const API_URL = 'https://api.digitalocean.com/v2';
//     const API_TOKEN = 'dop_v1_ddd769065c2f032167251326641f0e941f6eda6fad937a9ef19a18673676653d';

//     const response = await axios.get(`${API_URL}/users`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_TOKEN}`
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// }

async function getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  async function getUserById(req, res) {
    const userId = req.params.id;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  async function createUser(req, res) {
    try {
      const { userid, username, password, createdAt, updatedAt, email } = req.body;
  
      // const existingUserPromise = User.findOne({ email }).exec();
      // const hashedPasswordPromise = bcrypt.hash(password, 10);
  
      // const [existingUser, hashedPassword] = await Promise.all([
      //   existingUserPromise,
      //   hashedPasswordPromise,
      // ]);
  
      // if (existingUser) {
      //   return res.status(400).json({ message: "Email already exists" });
      // }
  
      const newUser = await User.create({
        userid,
        username,
        password,
        // password: hashedPassword,
        createdAt,
        updatedAt,
        email,
      });
  
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
  
  async function updateUser(req, res) {
    try {
      const { id } = req.params;
      const update = { username, password, createdAt, updatedAt, email } = req.body;
  
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    
      await user.update(update);

      res.status(200).json({ user });
     
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  async function deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  async function loginUser(req, res) {
    const { email, password } = req.body;
    //const user = await User.findOne({ email, password });
    try {
      const user = await User.findOne({ where: { email, password } });

      if (!user) {
        return res.status(401).send('Invalid username or password');
      }
      else{
        res.redirect('/views/home.html');
      }
      //token
      // const match = await bcrypt.compare(password, user.password);

      // if (!match) {
      //   return res.status(401).send('Invalid username or password match');
      // }
      // const token = jwt.sign({ id: user.email }, config.jwt.secret, {
      //   expiresIn: config.jwt.expiresIn,
      // });
    
      // req.session.token = token;
      // res.json({ token });

    } catch (error) {
      console.error(error);
      res.status(500).send('Server error loginUser');
    }
  }

  async function logout(req, res) {
    try {
    req.session = null;
    res.json({ message: 'Logged out successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    }
  }

  async function register(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
    
      if (existingUser) {
        return res.status(400).send('Username already taken');
      }
    
      const hashedPassword = await bcrypt.hash(password, saltRounds);
    
      const user = await User.create({ username, password: hashedPassword });
    
      const token = jwt.sign({ id: user.id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });
    
      req.session.token = token;
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logout,
    register,

  };




