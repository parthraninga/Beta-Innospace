import { Request, Response } from 'express';
import Category from '../models/Category';
import Design from '../models/Design';
import { createError, asyncHandler } from '../middleware/errorHandler';

// @desc    Get all categories (admin)
// @route   GET /api/admin/categories
// @access  Private/Admin
export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const includeInactive = req.query.includeInactive === 'true';
  
  const filter = includeInactive ? {} : { isActive: true };
  
  const categories = await Category.find(filter)
    .sort({ sortOrder: 1, createdAt: -1 })
    .populate('designCount');

  res.status(200).json({
    success: true,
    data: categories
  });
});

// @desc    Get single category (admin)
// @route   GET /api/admin/categories/:id
// @access  Private/Admin
export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw createError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Create new category
// @route   POST /api/admin/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, slug, description, thumbnail } = req.body;

  // Validate required fields
  if (!name || !slug || !description || !thumbnail) {
    throw createError('Please provide name, slug, description, and thumbnail', 400);
  }

  // Check if slug already exists
  const existingCategory = await Category.findOne({ slug });
  if (existingCategory) {
    throw createError('Category with this slug already exists', 400);
  }

  // Get the highest sortOrder
  const lastCategory = await Category.findOne().sort({ sortOrder: -1 });
  const sortOrder = lastCategory ? lastCategory.sortOrder + 1 : 0;

  const category = await Category.create({
    name,
    slug: slug.toLowerCase(),
    description,
    thumbnail,
    sortOrder
  });

  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    throw createError('Category not found', 404);
  }

  // If slug is being changed, check for duplicates
  if (req.body.slug && req.body.slug !== category.slug) {
    const existingCategory = await Category.findOne({ 
      slug: req.body.slug.toLowerCase(),
      _id: { $ne: req.params.id }
    });
    
    if (existingCategory) {
      throw createError('Category with this slug already exists', 400);
    }
    
    req.body.slug = req.body.slug.toLowerCase();
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw createError('Category not found', 404);
  }

  // Check if category has designs
  const designCount = await Design.countDocuments({ category: category._id });
  
  if (designCount > 0) {
    throw createError(`Cannot delete category. It has ${designCount} associated designs. Please move or delete the designs first.`, 400);
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully'
  });
});

// @desc    Toggle category active status
// @route   PUT /api/admin/categories/:id/toggle
// @access  Private/Admin
export const toggleCategoryStatus = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw createError('Category not found', 404);
  }

  category.isActive = !category.isActive;
  await category.save();

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Reorder categories
// @route   PUT /api/admin/categories/reorder
// @access  Private/Admin
export const reorderCategories = asyncHandler(async (req: Request, res: Response) => {
  const { categories } = req.body; // Array of { id, sortOrder }

  if (!categories || !Array.isArray(categories)) {
    throw createError('Please provide categories array with id and sortOrder', 400);
  }

  // Update all categories in parallel
  const updatePromises = categories.map((item: any) => 
    Category.findByIdAndUpdate(item.id, { sortOrder: item.sortOrder })
  );

  await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    message: 'Categories reordered successfully'
  });
});

// @desc    Get public categories
// @route   GET /api/categories
// @access  Public
export const getPublicCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true })
    .sort({ sortOrder: 1 })
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
    data: categoriesWithCount
  });
});

// @desc    Get category by slug (public)
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findOne({ 
    slug: req.params.slug, 
    isActive: true 
  });

  if (!category) {
    throw createError('Category not found', 404);
  }

  // Get design count
  const designCount = await Design.countDocuments({ 
    category: category._id, 
    isActive: true 
  });

  res.status(200).json({
    success: true,
    data: {
      ...category.toObject(),
      designCount
    }
  });
});