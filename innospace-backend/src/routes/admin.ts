import express from 'express';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin', 'manager'));

// Category management routes
router.get('/categories', (req, res) => {
  res.json({ message: 'Get all categories - TODO: implement' });
});

router.post('/categories', (req, res) => {
  res.json({ message: 'Create category - TODO: implement' });
});

// Design management routes
router.get('/designs', (req, res) => {
  res.json({ message: 'Get all designs - TODO: implement' });
});

router.post('/designs', (req, res) => {
  res.json({ message: 'Create design - TODO: implement' });
});

// Upload routes
router.post('/upload/single', (req, res) => {
  res.json({ message: 'Upload single image - TODO: implement' });
});

export default router;