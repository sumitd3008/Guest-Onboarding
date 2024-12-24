const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // res.status(200).json({ token });
    res.cookie('token', token, { maxAge: 900000, httpOnly: true })
    if (user.role === 'MainAdmin') {
      return res.redirect('/admin')
    }
    else if (user.role === 'GuestAdmin') {
      return res.redirect('/admin/hotels')
    }
    else if (user.role === 'Guest') {
      return res.redirect('/guest')
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

