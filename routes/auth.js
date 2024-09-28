// // server/routes/auth.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// // Placeholder login endpoint for admin
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === 'admin123') {
//     const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// module.exports = router;


const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// User login
router.post('/login', authController.loginUser);
router.post('/registerUser', authController.registerUser);

module.exports = router;
