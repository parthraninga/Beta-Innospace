import { Request, Response } from 'express';
import Consultation, { IConsultation } from '../models/Consultation';

// Create consultation request (public endpoint)
export const createConsultation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, mobile, location, propertyType, whatsappUpdates, submittedAt } = req.body;

    // Validate required fields
    if (!name || !mobile || !location || !propertyType) {
      res.status(400).json({
        success: false,
        message: 'All fields are required: name, mobile, location, propertyType'
      });
      return;
    }

    // Check for duplicate consultation in last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingConsultation = await Consultation.findOne({
      mobile,
      createdAt: { $gte: twentyFourHoursAgo }
    });

    if (existingConsultation) {
      res.status(409).json({
        success: false,
        message: 'A consultation request with this mobile number was already submitted in the last 24 hours'
      });
      return;
    }

    // Create new consultation
    const consultation = new Consultation({
      name: name.trim(),
      mobile: mobile.trim(),
      location: location.trim(),
      propertyType: propertyType.trim(),
      whatsappUpdates: whatsappUpdates === true,
      submittedAt: submittedAt ? new Date(submittedAt) : new Date()
    });

    const savedConsultation = await consultation.save();

    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully',
      data: {
        id: savedConsultation._id,
        name: savedConsultation.name,
        mobile: savedConsultation.mobile,
        location: savedConsultation.location,
        propertyType: savedConsultation.propertyType,
        status: savedConsultation.status,
        submittedAt: savedConsultation.submittedAt
      }
    });
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to submit consultation request'
      });
    }
  }
};

// Get all consultations (admin endpoint)
export const getAllConsultations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Build filter
    const filter: any = {};
    if (status && typeof status === 'string') {
      filter.status = status;
    }

    // Parse pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = Math.min(parseInt(limit as string) || 10, 50); // Max 50 per page
    const skip = (pageNum - 1) * limitNum;

    // Get consultations with pagination
    const consultations = await Consultation.find(filter)
      .sort(sort as string)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Consultation.countDocuments(filter);

    res.json({
      success: true,
      data: consultations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error: any) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations'
    });
  }
};

// Get consultation by ID (admin endpoint)
export const getConsultationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const consultation = await Consultation.findById(id);

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
      return;
    }

    res.json({
      success: true,
      data: consultation
    });
  } catch (error: any) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultation'
    });
  }
};

// Update consultation status (admin endpoint)
export const updateConsultationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes, scheduledDate } = req.body;

    const updateData: Partial<IConsultation> = {};
    
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes.trim();
    if (scheduledDate) updateData.scheduledDate = new Date(scheduledDate);

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Consultation updated successfully',
      data: consultation
    });
  } catch (error: any) {
    console.error('Error updating consultation:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to update consultation'
      });
    }
  }
};

// Delete consultation (admin endpoint)
export const deleteConsultation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const consultation = await Consultation.findByIdAndDelete(id);

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Consultation deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete consultation'
    });
  }
};