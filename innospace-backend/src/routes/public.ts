import express from 'express';

const router = express.Router();

// Public API routes (no authentication required)

// Categories
router.get('/categories', (req, res) => {
  res.json({ message: 'Get public categories - TODO: implement' });
});

// Designs
router.get('/designs', (req, res) => {
  res.json({ message: 'Get public designs - TODO: implement' });
});

router.get('/designs/:categorySlug', (req, res) => {
  res.json({ message: `Get designs for category ${req.params.categorySlug} - TODO: implement` });
});

// Projects
router.get('/projects', (req, res) => {
  res.json({ message: 'Get featured projects - TODO: implement' });
});

// Contact form
router.post('/contact', (req, res) => {
  res.json({ message: 'Contact form submission - TODO: implement' });
});

// Quote request
router.post('/quote', (req, res) => {
  res.json({ message: 'Quote request - TODO: implement' });
});

// Consultation booking
router.post('/consultation', (req, res) => {
  res.json({ message: 'Consultation booking - TODO: implement' });
});

export default router;