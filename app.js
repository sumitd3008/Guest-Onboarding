const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/admin.routes');
const guestRoutes = require('./routes/guest.routes');
const authRoutes = require('./routes/auth.routes');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS, etc.)

// Config for Cookie Engine
app.use(cookieParser())

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/admin', adminRoutes); // Admin panel routes
app.use('/guests', guestRoutes); // Guest form and guest admin panel routes
app.use('/auth', authRoutes); // Authentication routes

// Default route (for homepage or testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Digital Guest Onboarding System');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
