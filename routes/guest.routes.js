const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const guestController = require('../controllers/guest.controller');

const validateGuest = [
  body('fullName').notEmpty().withMessage('Full Name is required'),
  body('mobileNumber').isMobilePhone().withMessage('Invalid Mobile Number'),
  body('email').isEmail().withMessage('Invalid Email ID'),
  body('stayDates.from').notEmpty().withMessage('Start date is required'),
  body('stayDates.to').notEmpty().withMessage('End date is required'),
];

// Routes
router.post('/guests', validateGuest, guestController.addGuest);
router.get('/guests/:hotelId', guestController.getGuestsByHotel);
// Thank You Route
router.get('/thank-you', (req, res) => {
  res.render('thankYou');
});
router.get('/onboarding/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) return res.status(404).send('Hotel not found');
  res.render('onboarding', { hotel });
});

module.exports = router;
