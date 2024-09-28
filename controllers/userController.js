const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new user
exports.createUser = async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body; // role could be "specialist", "health coach", "nutritionist", etc.
  const id = generateId();
  try {
    const newUserRef = db.ref('users/'+id);
    await newUserRef.set({ firstName, lastName, role, email, password });
    res.status(200).json({
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No users available' });
    }
    const users = snapshot.val();
    const usersList = Object.keys(users).map((key) => ({ id: key, ...users[key] }));
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: usersList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const userRef = db.ref(`users/${id}`);
    await userRef.update(userData);
    res.status(200).json({
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userRef = db.ref(`users/${id}`);
    await userRef.remove();
    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message
    });
  }
};
