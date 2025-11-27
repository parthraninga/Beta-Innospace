import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { createError } from './errorHandler';

interface AuthRequest extends Request {
  user?: any;
}

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

// Protect routes middleware
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return next(createError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as JwtPayload;

    // Find user by ID from token
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(createError('User not found or inactive', 401));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return next(createError('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('User not found in request', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        createError(`User role ${req.user.role} is not authorized to access this route`, 403)
      );
    }

    next();
  };
};