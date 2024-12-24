const jwt = require('jsonwebtoken');

// Verify Main Admin
exports.verifyMainAdmin = (req, res, next) => {
  try {
    const token = req.cookies['token']
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'MainAdmin') return res.status(403).json({ message: 'Access denied' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Verify Guest Admin
exports.verifyGuestAdmin = (req, res, next) => {
  try {
    const token = req.cookies['token']
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'GuestAdmin') return res.status(403).json({ message: 'Access denied' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Verify Guest
exports.verifyGuest = (req, res, next) => {
  try {
    const token = req.cookies['token']
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'Guest') return res.status(403).json({ message: 'Access denied' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
