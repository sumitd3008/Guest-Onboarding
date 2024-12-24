const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Routes
router.post('/login', authController.login);
// Render Admin Panel
router.get('/login', async (req, res) => {
  res.render('login', { });
});

module.exports = router;
