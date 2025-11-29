import { Request, Response } from 'express';
import Category from '../models/Category';
import Design from '../models/Design';
import Project from '../models/Project';
import { createError, asyncHandler } from '../middleware/errorHandler';

// @desc    Get all public categories
// @route   GET /api/categories
// @access  Public
export const getPublicCategories = asyncHandler(async (req: Request, res: Response) => {
  // Get active categories only
  const categories = await Category.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .select('name slug description thumbnail');

  // Get design count for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const designCount = await Design.countDocuments({ 
        category: category._id, 
        isActive: true 
      });
      
      return {
        ...category.toObject(),
        designCount
      };
    })
  );

  res.status(200).json({
    success: true,
    data: categoriesWithCount,
    total: categoriesWithCount.length
  });
});

// @desc    Get all public designs
// @route   GET /api/designs
// @access  Public
export const getPublicDesigns = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const featured = req.query.featured as string;
  const search = req.query.search as string;

  // Build filter object
  const filter: any = { isActive: true };
  
  if (featured === 'true') {
    filter.isFeatured = true;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute queries
  const [designs, total] = await Promise.all([
    Design.find(filter)
      .populate('category', 'name slug')
      .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    Design.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    data: designs,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total,
      limit
    }
  });
});

// @desc    Get designs by category slug
// @route   GET /api/designs/:categorySlug
// @access  Public
export const getDesignsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { categorySlug } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const search = req.query.search as string;

  // Find category by slug
  const category = await Category.findOne({ 
    slug: categorySlug, 
    isActive: true 
  }).select('name slug description');

  if (!category) {
    throw createError('Category not found', 404);
  }

  // Build filter object
  const filter: any = { 
    category: category._id, 
    isActive: true 
  };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get designs for this category
  const [designs, total] = await Promise.all([
    Design.find(filter)
      .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    Design.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    data: {
      category,
      designs,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    }
  });
});

// @desc    Get all public projects
// @route   GET /api/projects
// @access  Public
export const getPublicProjects = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const featured = req.query.featured as string;
  const search = req.query.search as string;

  // Build filter object
  const filter: any = { isActive: true };
  
  if (featured === 'true') {
    filter.isFeatured = true;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute queries
  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate('category', 'name slug')
      .sort({ isFeatured: -1, 'projectDetails.completedDate': -1, sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'),
    Project.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    data: projects,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total,
      limit
    }
  });
});

// @desc    Get featured projects (for homepage/components)
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 6;

  const projects = await Project.find({ 
    isActive: true,
    isFeatured: true
  })
    .populate('category', 'name slug')
    .sort({ 'projectDetails.completedDate': -1, sortOrder: 1, createdAt: -1 })
    .limit(limit)
    .select('-__v');

  res.status(200).json({
    success: true,
    data: projects,
    total: projects.length
  });
});