import { Request, Response } from 'express';
import Project from '../models/Project';
import Category from '../models/Category';
import { createError, asyncHandler } from '../middleware/errorHandler';

// @desc    Get all projects
// @route   GET /api/admin/projects
// @access  Private/Admin
export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const category = req.query.category as string;
  const search = req.query.search as string;

  // Build filter for projects
  const filter: any = {};

  if (category && category !== 'all') {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
      { 'projectDetails.client': { $regex: search, $options: 'i' } },
      { 'projectDetails.location': { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate('category', 'name slug')
      .sort({ 'projectDetails.completedDate': -1, createdAt: -1 })
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

// @desc    Get project by ID
// @route   GET /api/admin/projects/:id
// @access  Private/Admin
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id).populate('category', 'name slug');

  if (!project) {
    throw createError('Project not found', 404);
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Create new project
// @route   POST /api/admin/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  // Ensure project has required project details
  if (!req.body.projectDetails) {
    req.body.projectDetails = {};
  }
  
  // If no completion date provided, set to current date for new projects
  if (!req.body.projectDetails.completedDate) {
    req.body.projectDetails.completedDate = new Date();
  }

  const createdProject = await Project.create(req.body);
  const project = await Project.findById((createdProject as any)._id).populate('category', 'name slug');

  res.status(201).json({
    success: true,
    data: project,
    message: 'Project created successfully'
  });
});

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    throw createError('Project not found', 404);
  }

  project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate('category', 'name slug');

  res.status(200).json({
    success: true,
    data: project,
    message: 'Project updated successfully'
  });
});

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw createError('Project not found', 404);
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
});

// @desc    Toggle project status
// @route   PUT /api/admin/projects/:id/toggle
// @access  Private/Admin
export const toggleProjectStatus = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw createError('Project not found', 404);
  }

  project.isActive = !project.isActive;
  await project.save();

  res.status(200).json({
    success: true,
    data: project,
    message: `Project ${project.isActive ? 'activated' : 'deactivated'} successfully`
  });
});