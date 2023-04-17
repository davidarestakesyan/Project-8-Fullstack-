const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt_generate = require ("../jwt/jwt_generate")


// Create a new user
const createUser = async (req, res) => {
  const { username, password} = req.body;
  const hashed_password = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password:hashed_password });
    res.status(201).json(user);
    const token = jwt_generate.generateAccessToken(username);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// make login
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(201).json({ status: 'Wrong credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(201).json({ status: 'Wrong credentials' });
    }

    const token = jwt_generate.generateAccessToken(username);
    return     res.json({ user, token });
    // res.status(201).json({ status: 'Logged in', jwt: token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

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
  // updateUser,
  deleteUser
};