const Reservation = require('../models/Reservation');

// POST /api/reservations (Create a reservation)
const createReservation = async (req, res) => {
  try {
    const { accommodationId, property, checkIn, checkOut, guests, totalCost } = req.body;

    if (!property || !checkIn || !checkOut || !totalCost) {
      return res.status(400).json({ error: 'Missing required reservation fields' });
    }

    const reservation = new Reservation({
      accommodation: accommodationId,
      property,
      checkIn,
      checkOut,
      guests: guests || 1,
      totalCost,
      user: req.user.id // Extracted from auth middleware
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/reservations/user (Get reservations made by the logged-in user)
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate('accommodation');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/reservations/host (Get all reservations for the host dashboard)
const getHostReservations = async (req, res) => {
  try {
    // Populates user info so "Booked by" renders correctly in the table
    const reservations = await Reservation.find()
      .populate('user', 'username email');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/reservations/:id (Delete/cancel a reservation)
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await Reservation.findByIdAndDelete(id);
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getHostReservations,
  deleteReservation
};