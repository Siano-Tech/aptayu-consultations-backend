const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateId } = require('../utils/utils');
const { db } = require('../config/firebase');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Simplified login logic (replace with real user authentication logic)
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      data: { token }
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
      error: 'Username or password is incorrect'
    });
  }
};


exports.registerUser = async (req, res) => {
  const { name, email, phoneNo, password } = req.body;
  const uid = generateId();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      phoneNo,
      password: hashedPassword,
      uid,
      timeStamp: new Date().toISOString()
    };

    console.log(user)

    const usersRef = db.ref('users');
    usersRef.orderByChild('phoneNo').equalTo(phoneNo).once('value', async (snapshot) => {
      if (snapshot.exists()) {
        return res.status(400).json({ message: 'Phone no. already registered, please try with a different phone no.' });
      }

      const userRef = db.ref('users/'+ uid);
      await userRef.set(user);
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { phoneNo, password } = req.body;

  try {
    const usersRef = db.ref('users');
    usersRef.orderByChild('phoneNo').equalTo(phoneNo).once('value', async (snapshot) => {
      if (!snapshot.exists()) {
        return res.status(400).json({ message: 'User is not registered' });
      }

      const user = snapshot.val();
      const userId = Object.keys(user)[0];
      let userData = user[userId];

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      delete userData.password;
      
      const token = jwt.sign({ id: userId }, 'JWT_SECRET', { expiresIn: '1h' });
      res.status(200).json({ 
        data: { token, user: userData }, 
        message: 'Login Successful' 
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};