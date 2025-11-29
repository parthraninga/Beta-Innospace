import mongoose, { Document, Schema } from 'mongoose';

// Interface for Consultation document
export interface IConsultation extends Document {
  name: string;
  mobile: string;
  location: string;
  propertyType: string;
  whatsappUpdates: boolean;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  scheduledDate?: Date;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Consultation schema
const ConsultationSchema = new Schema<IConsultation>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
    trim: true
  },
  whatsappUpdates: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    trim: true
  },
  scheduledDate: {
    type: Date
  },
  submittedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
ConsultationSchema.index({ status: 1, createdAt: -1 });
ConsultationSchema.index({ mobile: 1 });
ConsultationSchema.index({ location: 1 });

// Export the model
export default mongoose.model<IConsultation>('Consultation', ConsultationSchema);