

const Accommodation = require('../models/Accommodation');

const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAccommodation = async (req, res) => {
  try {
    const {
      title,
      location,
      description,
      bedrooms,
      bathrooms,
      guests,
      type,
      price,
      amenities,
      images,
      weeklyDiscount,
      cleaningFee,
      serviceFee,
      occupancyTaxes,
      rating,
      reviews
    } = req.body;

    // Validating required fields
    if (!title || !location || !description || !bedrooms || !bathrooms || 
        !guests || !type || !price) {
      return res.status(400).json({ 
        error: 'Required fields: title, location, description, bedrooms, bathrooms, guests, type, price' 
      });
    }

    const newAccommodation = new Accommodation({
      title,
      location,
      description,
      bedrooms,
      bathrooms,
      guests,
      type,
      price,
      amenities: amenities || [],
      images: images || [],
      weeklyDiscount: weeklyDiscount || 0,
      cleaningFee: cleaningFee || 0,
      serviceFee: serviceFee || 0,
      occupancyTaxes: occupancyTaxes || 0,
      rating: rating || 0,
      reviews: reviews || 0,
      host: req.user.username,      
      host_id: req.user.id          
    });

    // Saving to database
    const savedAccommodation = await newAccommodation.save();
    res.status(201).json(savedAccommodation);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deleting accommodation by ID (Protected***)
const deleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params;

    // Finding the accommodation
    const accommodation = await Accommodation.findById(id);
if (accommodation.host_id && accommodation.host_id.toString() !== req.user.id) {
  return res.status(403).json({ 
    error: 'You are not authorized to perform this action on this listing' 
  });
}

    // Check if user is the host (who created the listing)
    if (accommodation.host_id.toString() !== req.user.id) {
      return res.status(403).json({ 
        error: 'You are not authorized to update this listing' 
      });
    }

    // Updating the accommodation
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedAccommodation);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAccommodation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    if (accommodation.host_id && accommodation.host_id.toString() !== req.user.id) {
      return res.status(403).json({ 
        error: 'You are not authorized to update this listing' 
      });
    }

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedAccommodation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllAccommodations,
  createAccommodation,
  deleteAccommodation,
  updateAccommodation
};