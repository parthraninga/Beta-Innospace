import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { 
  getPublicCategories,
  getPublicDesigns,
  getDesignsByCategory,
  getPublicProjects,
  getFeaturedProjects
} from '../controllers/publicController';
import { getPageBySlug } from '../controllers/pageController';
import { createConsultation } from '../controllers/consultationController';

const router = express.Router();

// Public API routes (no authentication required)

// Categories
router.get('/categories', asyncHandler(getPublicCategories));

// Designs
router.get('/designs', asyncHandler(getPublicDesigns));
router.get('/designs/:categorySlug', asyncHandler(getDesignsByCategory));

// Projects
router.get('/projects', asyncHandler(getPublicProjects));
router.get('/projects/featured', asyncHandler(getFeaturedProjects));

// Pages
router.get('/pages/:slug', asyncHandler(getPageBySlug));

// Contact form
router.post('/contact', (req, res) => {
  res.json({ message: 'Contact form submission - TODO: implement' });
});

// Quote request
router.post('/quote', (req, res) => {
  res.json({ message: 'Quote request - TODO: implement' });
});

// Consultation booking
router.post('/consultation', asyncHandler(createConsultation));

// Settings
router.get('/settings', asyncHandler(async (req: Request, res: Response) => {
  const Settings = (await import('../models/Settings')).default;
  
  let settings = await Settings.findOne();
  
  // If no settings exist, create default ones
  if (!settings) {
    settings = new Settings({
      phoneNumber: '+91-9876543210',
      email: 'contact@innospace.com',
      address: 'Mumbai, India',
      socialLinks: {
        facebook: 'https://facebook.com/innospace',
        instagram: 'https://instagram.com/innospace',
      },
      businessHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed',
      },
    });
    await settings.save();
  }
  
  res.json(settings);
}));

export default router;