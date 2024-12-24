const Guest = require('../models/guest.model');

// Add guest details
exports.addGuest = async (req, res) => {
  try {
    const { fullName, mobileNumber, address, purposeOfVisit, stayDates, email, idProofNumber, hotelId } = req.body;

    const newGuest = new Guest({
      fullName,
      mobileNumber,
      address,
      purposeOfVisit,
      stayDates,
      email,
      idProofNumber,
      hotelId
    });

    await newGuest.save();
    res.status(201).json({ message: 'Guest details added successfully', guest: newGuest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get guests for a hotel
exports.getGuestsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const guests = await Guest.find({ hotelId });
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const updatedGuest = await Guest.findByIdAndUpdate(guestId, req.body, { new: true });
    res.status(200).json({ message: 'Guest updated successfully', guest: updatedGuest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGuestById = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
