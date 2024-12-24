const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const hotel = require('../models/hotel.model');

const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/hotels', upload.single('logo'), authMiddleware.verifyMainAdmin, adminController.addHotel);
router.get('/hotels', authMiddleware.verifyMainAdmin, adminController.getAllHotels);
// Render Admin Panel
router.get('', authMiddleware.verifyMainAdmin, async (req, res) => {
  const hotels = await hotel.find();
  res.render('admin', { hotels });
});

module.exports = router;
