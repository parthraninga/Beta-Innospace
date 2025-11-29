import { Request, Response } from 'express';
import Page, { IPage, IPageSection } from '../models/Page';
import { v4 as uuidv4 } from 'uuid';

// Get all pages (admin)
export const getAllPages = async (req: Request, res: Response): Promise<void> => {
  try {
    const pages = await Page.find({}).sort({ updatedAt: -1 });
    res.json({
      success: true,
      data: pages,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pages',
      error: error.message,
    });
  }
};

// Get single page by slug (public)
export const getPageBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug, isActive: true });

    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    res.json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch page',
      error: error.message,
    });
  }
};

// Create new page (admin)
export const createPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, title, metaTitle, metaDescription, sections, seo } = req.body;

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      res.status(400).json({
        success: false,
        message: 'Page with this slug already exists',
      });
      return;
    }

    // Add IDs to sections if not provided
    const sectionsWithIds = sections?.map((section: any) => ({
      ...section,
      id: section.id || uuidv4(),
      items: section.items?.map((item: any) => ({
        ...item,
        id: item.id || uuidv4(),
      })),
    }));

    const page = new Page({
      slug,
      title,
      metaTitle,
      metaDescription,
      sections: sectionsWithIds || [],
      seo,
    });

    await page.save();

    res.status(201).json({
      success: true,
      data: page,
      message: 'Page created successfully',
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to create page',
        error: error.message,
      });
    }
  }
};

// Update page (admin)
export const updatePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { slug, title, metaTitle, metaDescription, sections, seo, isActive } = req.body;

    // Check if slug is being changed and if it already exists
    if (slug) {
      const existingPage = await Page.findOne({ slug, _id: { $ne: id } });
      if (existingPage) {
        res.status(400).json({
          success: false,
          message: 'Page with this slug already exists',
        });
        return;
      }
    }

    // Add IDs to sections if not provided
    const sectionsWithIds = sections?.map((section: any) => ({
      ...section,
      id: section.id || uuidv4(),
      items: section.items?.map((item: any) => ({
        ...item,
        id: item.id || uuidv4(),
      })),
    }));

    const page = await Page.findByIdAndUpdate(
      id,
      {
        ...(slug && { slug }),
        ...(title && { title }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(sections && { sections: sectionsWithIds }),
        ...(seo && { seo }),
        ...(isActive !== undefined && { isActive }),
      },
      { new: true, runValidators: true }
    );

    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    res.json({
      success: true,
      data: page,
      message: 'Page updated successfully',
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to update page',
        error: error.message,
      });
    }
  }
};

// Delete page (admin)
export const deletePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const page = await Page.findByIdAndDelete(id);

    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete page',
      error: error.message,
    });
  }
};

// Add section to page (admin)
export const addSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const sectionData = req.body;

    const page = await Page.findById(id);
    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    const newSection: IPageSection = {
      ...sectionData,
      id: sectionData.id || uuidv4(),
      items: sectionData.items?.map((item: any) => ({
        ...item,
        id: item.id || uuidv4(),
      })),
    };

    page.sections.push(newSection);
    await page.save();

    res.json({
      success: true,
      data: page,
      message: 'Section added successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to add section',
      error: error.message,
    });
  }
};

// Update section (admin)
export const updateSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, sectionId } = req.params;
    const sectionData = req.body;

    const page = await Page.findById(id);
    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    const sectionIndex = page.sections.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Section not found',
      });
      return;
    }

    // Update section with IDs for items if not provided
    page.sections[sectionIndex] = {
      ...page.sections[sectionIndex],
      ...sectionData,
      items: sectionData.items?.map((item: any) => ({
        ...item,
        id: item.id || uuidv4(),
      })) || page.sections[sectionIndex].items,
    };

    await page.save();

    res.json({
      success: true,
      data: page,
      message: 'Section updated successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update section',
      error: error.message,
    });
  }
};

// Delete section (admin)
export const deleteSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, sectionId } = req.params;

    const page = await Page.findById(id);
    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    const sectionIndex = page.sections.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Section not found',
      });
      return;
    }

    page.sections.splice(sectionIndex, 1);
    await page.save();

    res.json({
      success: true,
      data: page,
      message: 'Section deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete section',
      error: error.message,
    });
  }
};

// Reorder sections (admin)
export const reorderSections = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { sections } = req.body;

    const page = await Page.findById(id);
    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found',
      });
      return;
    }

    // Update sort order based on array position
    const updatedSections = sections.map((sectionId: string, index: number) => {
      const section = page.sections.find(s => s.id === sectionId);
      if (section) {
        section.sortOrder = index;
        return section;
      }
      return null;
    }).filter(Boolean);

    page.sections = updatedSections;
    await page.save();

    res.json({
      success: true,
      data: page,
      message: 'Sections reordered successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to reorder sections',
      error: error.message,
    });
  }
};