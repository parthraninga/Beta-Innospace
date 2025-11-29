import { Request, Response } from 'express';
import Design from '../models/Design';
import Category from '../models/Category';
import { createError, asyncHandler } from '../middleware/errorHandler';

// @desc    Get all designs (admin)
// @route   GET /api/admin/designs
// @access  Private/Admin
export const getAllDesigns = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = req.query.sortBy as string || 'createdAt';
  const sortOrder = req.query.sortOrder as string || 'desc';
  const category = req.query.category as string;
  const isActive = req.query.isActive as string;
  const search = req.query.search as string;

  // Build filter object
  const filter: any = {};
  
  if (category) {
    filter.category = category;
  }
  
  if (isActive !== undefined) {
    filter.isActive = isActive === 'true';
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

  // Build sort object
  const sort: any = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute queries
  const [designs, total] = await Promise.all([
    Design.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit),
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

// @desc    Get single design (admin)
// @route   GET /api/admin/designs/:id
// @access  Private/Admin
export const getDesignById = asyncHandler(async (req: Request, res: Response) => {
  const design = await Design.findById(req.params.id).populate('category');

  if (!design) {
    throw createError('Design not found', 404);
  }

  res.status(200).json({
    success: true,
    data: design
  });
});

// @desc    Create new design
// @route   POST /api/admin/designs
// @access  Private/Admin
export const createDesign = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, category, images, tags, price, isFeatured } = req.body;

  // Validate required fields
  if (!title || !description || !category) {
    throw createError('Please provide title, description, and category', 400);
  }

  // Check if category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    throw createError('Category not found', 404);
  }

  // Get the highest sortOrder for this category
  const lastDesign = await Design.findOne({ category })
    .sort({ sortOrder: -1 });
  
  const sortOrder = lastDesign ? lastDesign.sortOrder + 1 : 0;

  const design = await Design.create({
    title,
    description,
    category,
    images: images && images.length > 0 ? images : [{
      url: 'https://via.placeholder.com/400x300?text=No+Image',
      thumbnail: 'https://via.placeholder.com/200x150?text=No+Image',
      alt: `${title} placeholder image`,
      sortOrder: 0
    }],
    tags: tags || [],
    price: price ? {
      min: price,
      max: price,
      currency: 'INR'
    } : undefined,
    isFeatured: isFeatured || false,
    sortOrder
  });

  const populatedDesign = await Design.findById(design._id).populate('category');

  res.status(201).json({
    success: true,
    data: populatedDesign
  });
});

// @desc    Update design
// @route   PUT /api/admin/designs/:id
// @access  Private/Admin
export const updateDesign = asyncHandler(async (req: Request, res: Response) => {
  let design = await Design.findById(req.params.id);

  if (!design) {
    throw createError('Design not found', 404);
  }

  // If category is being changed, validate it exists
  if (req.body.category && req.body.category !== design.category.toString()) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      throw createError('Category not found', 404);
    }
  }

  design = await Design.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('category');

  res.status(200).json({
    success: true,
    data: design
  });
});

// @desc    Delete design
// @route   DELETE /api/admin/designs/:id
// @access  Private/Admin
export const deleteDesign = asyncHandler(async (req: Request, res: Response) => {
  const design = await Design.findById(req.params.id);

  if (!design) {
    throw createError('Design not found', 404);
  }

  await design.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Design deleted successfully'
  });
});

// @desc    Toggle design active status
// @route   PUT /api/admin/designs/:id/toggle
// @access  Private/Admin
export const toggleDesignStatus = asyncHandler(async (req: Request, res: Response) => {
  const design = await Design.findById(req.params.id);

  if (!design) {
    throw createError('Design not found', 404);
  }

  design.isActive = !design.isActive;
  await design.save();

  res.status(200).json({
    success: true,
    data: design
  });
});

// @desc    Reorder designs
// @route   PUT /api/admin/designs/reorder
// @access  Private/Admin
export const reorderDesigns = asyncHandler(async (req: Request, res: Response) => {
  const { designs } = req.body; // Array of { id, sortOrder }

  if (!designs || !Array.isArray(designs)) {
    throw createError('Please provide designs array with id and sortOrder', 400);
  }

  // Update all designs in parallel
  const updatePromises = designs.map((item: any) => 
    Design.findByIdAndUpdate(item.id, { sortOrder: item.sortOrder })
  );

  await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    message: 'Designs reordered successfully'
  });
});

// @desc    Get designs by category (public)
// @route   GET /api/designs/:categorySlug
// @access  Public
export const getDesignsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  // Find category by slug
  const category = await Category.findOne({ 
    slug: req.params.categorySlug, 
    isActive: true 
  });

  if (!category) {
    throw createError('Category not found', 404);
  }

  const skip = (page - 1) * limit;

  // Get designs for this category
  const [designs, total] = await Promise.all([
    Design.find({ 
      category: category._id, 
      isActive: true 
    })
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Design.countDocuments({ 
      category: category._id, 
      isActive: true 
    })
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

// @desc    Get all public designs
// @route   GET /api/designs
// @access  Public
export const getPublicDesigns = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const featured = req.query.featured as string;

  const filter: any = { isActive: true };
  
  if (featured === 'true') {
    filter.isFeatured = true;
  }

  const skip = (page - 1) * limit;

  const [designs, total] = await Promise.all([
    Design.find(filter)
      .populate('category', 'name slug')
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
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