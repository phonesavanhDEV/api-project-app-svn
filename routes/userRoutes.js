
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
  



// Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logout);
router.post('/register', userController.register);

module.exports = router;
