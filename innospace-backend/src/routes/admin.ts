import express from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  reorderCategories,
} from '../controllers/categoryController';
import {
  getAllDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign,
  toggleDesignStatus,
  reorderDesigns,
} from '../controllers/designController';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectStatus,
} from '../controllers/projectController';
import {
  getAllPages,
  createPage,
  updatePage,
  deletePage,
  addSection,
  updateSection,
  deleteSection,
  reorderSections,
} from '../controllers/pageController';
import {
  getAllConsultations,
  getConsultationById,
  updateConsultationStatus,
  deleteConsultation,
} from '../controllers/consultationController';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin', 'manager'));

// Category management routes
router.route('/categories')
  .get(getAllCategories)
  .post(createCategory);

router.put('/categories/reorder', reorderCategories);

router.route('/categories/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

router.put('/categories/:id/toggle', toggleCategoryStatus);

// Design management routes
router.route('/designs')
  .get(getAllDesigns)
  .post(createDesign);

router.put('/designs/reorder', reorderDesigns);

router.route('/designs/:id')
  .get(getDesignById)
  .put(updateDesign)
  .delete(deleteDesign);

router.put('/designs/:id/toggle', toggleDesignStatus);

// Project management routes (completed work)
router.route('/projects')
  .get(getAllProjects)
  .post(createProject);

router.route('/projects/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

router.put('/projects/:id/toggle', toggleProjectStatus);

// Page management routes
router.route('/pages')
  .get(getAllPages)
  .post(createPage);

router.route('/pages/:id')
  .put(updatePage)
  .delete(deletePage);

router.post('/pages/:id/sections', addSection);
router.put('/pages/:id/sections/:sectionId', updateSection);
router.delete('/pages/:id/sections/:sectionId', deleteSection);
router.put('/pages/:id/sections/reorder', reorderSections);

// Consultation management routes
router.route('/consultations')
  .get(getAllConsultations);

router.route('/consultations/:id')
  .get(getConsultationById)
  .put(updateConsultationStatus)
  .delete(deleteConsultation);

// Upload routes - TODO: implement file upload with Multer/Cloudinary
router.post('/upload/single', (req, res) => {
  res.json({ message: 'Upload single image - TODO: implement with Cloudinary' });
});

export default router;