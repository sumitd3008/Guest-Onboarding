const Hotel = require('../models/hotel.model');
const { generateQRCode } = require('../utils/qrCodeGenerator');

/**
 * Add a new hotel.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
exports.addHotel = async (req, res) => {
  try {
    const { name, address } = req.body;
    const logo = req.file?.path; // File path of the uploaded logo

    if (!name || !address || !logo) {
      return res.status(400).json({ error: "Name, address, and logo are required." });
    }

    // Save hotel in the database
    const newHotel = new Hotel({ name, address, logo });
    await newHotel.save();

    // Generate QR Code for the hotel
    const qrCode = await generateQRCode(`http://localhost:5000/hotels/${newHotel._id}`);
    newHotel.qrCode = qrCode;
    await newHotel.save();

    res.redirect('/admin');

  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ error: "Failed to add hotel." });
  }
};


// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
