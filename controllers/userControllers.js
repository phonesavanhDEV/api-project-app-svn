
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;

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
  
    
  
      const newUser = await User.create({
        userid,
        username,
        password,
        
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

  // async function loginUser(req, res) {
  //   const { email, password } = req.body;

  //   try {
  //     // Check if user with email exists in database
  //     const user = await User.findOne({ where: { email } });
  //     if (!user) {
  //       return res.status(401).json({ error: 'Invalid email or password user' });
  //     }
  
  //     // Compare password with hashed password in database
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(401).json({ error: 'Invalid email or password bcrypt' });
  //     }
  
  //     // Generate JWT token and send it back in response
  //     const token = jwt.sign({ id: user.userid }, process.env.SECRET_KEY);
  //     res.cookie('token', token, { httpOnly: true });
  //     res.json({ message: 'Logged in successfully', token });

  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Server error' });
  //   }
  // }
  async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Check if user with email exists in database
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password user' });
      }
  
      // Compare password with hashed password in database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password bcrypt' });
      }
  
      // Generate JWT token and send it back in response
      const token = jwt.sign({ email }, secret);
  
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Logged in successfully', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
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
    const { userid, username, password, createdAt, updatedAt, email } = req.body;
    if (!userid || !username || !password || !createdAt || !updatedAt || !email) {
      return res.status(400).json({ message: 'Missing fields' });
      }
    const hashedPassword = await bcrypt.hash(String(password), 10);
  
    try {
      const user = await User.create({
        userid,
        username,
        password: hashedPassword,
        createdAt,
        updatedAt,
        email,
      });
 
      const token = jwt.sign({ id: user.userid }, process.env.SECRET_KEY);
      req.session.token = token;
      
      res.status(200).json({
        message: 'User created successfully',
        token,
      });
      res.redirect('/views/home.html');
    } catch (error) {
      res.status(400).json({ message: error.message });
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




