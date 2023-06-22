
const bcrypt = require('bcrypt');
const { User } = require('../models');
const {generateAccessToken} = require ("../jwt/jwt_generate")
const {Users} = require("./index");


// Create a new user
// const createUser = async (req, res) => {
//   const {  username, password} = req.body;
//   const hashed_password = await bcrypt.hash(password, 10);

//   try {
    
//     const user = await User.create({  username, password:hashed_password ,role:0});
//     res.status(201).json(user);
//     const token = jwt_generate.generateAccessToken(username);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//   }
  //
  async function createUser(req, res){

    const {username,password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
  
    const newUser = {
        username,
        password: hashed_password,
        role: 0
    }
    Users.create(newUser).then((user)=>{
        res.status(201).json(user)
      }).catch((err)=>{
        res.status(500).json({error: err.message})
      })
}


   
      // make login  
      // async function loginUser(req, res) {
      //   const { username, password } = req.body;
      
      //   try {
      //     const user = await Users.findOne({ where: { username } });
      //     if (!user) {
      //       return res.status(401).json({ status: 'Wrong credentials' });
      //     }
      
      //     const match = await bcrypt.compare(password, user.password);
      //     if (!match) {
      //       return res.status(401).json({ status: 'Wrong credentials' });
      //     }
      
      //     const token = jwt_generate.generateAccessToken(user.username,user.role);
      //     return res.status(200).json({ status: 'Logged in', jwt: token, user });
      //   } catch (error) {
      //     console.error(error);
      //     return res.status(500).json({ error: error.message });
      //   }
      // }
      function loginUser (req, res){
        const { username, password } = req.body;
    
        Users.findOne({
            where: {
              username:username
            }
        }).then(async (user)=> {
            const validPassword = await bcrypt.compare(password, user.password);
            if (username===user.username && validPassword){
                const token = generateAccessToken(user.username, user.role);
                res.send(JSON.stringify({status: "Logged in", jwt:token, role:user.role}));
            }else {
                return res.status(400).send("Invalid password");
            }
        }).catch((err)=> {
            res.status(500).json({error: err.message})
        })
    };



// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete an existing user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser
};