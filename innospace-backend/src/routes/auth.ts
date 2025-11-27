import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { login, getMe } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login admin user
// @access  Public
router.post('/login', asyncHandler(login));

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, asyncHandler(getMe));

export default router;