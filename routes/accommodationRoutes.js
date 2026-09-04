
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllAccommodations,
  createAccommodation,
  deleteAccommodation,
  updateAccommodation
} = require('../controllers/accomodationController');

router.get('/', getAllAccommodations);
router.post('/', auth, createAccommodation);
router.put('/:id', auth, updateAccommodation);
router.delete('/:id', auth, deleteAccommodation);

module.exports = router;