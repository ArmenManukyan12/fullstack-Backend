const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
 
router.post('/register', usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/allusers', usersController.getAllUsers);
router.get('/singleuser/:id', usersController.getUserById);
router.delete('/deleteuser/:id', usersController.deleteUser);
module.exports = router;



