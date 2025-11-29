import { Schema, model, Document, Types, CallbackError } from 'mongoose';

export interface IProjectImage {
  url: string;
  thumbnail: string;
  alt: string;
  sortOrder: number;
  publicId?: string; // Cloudinary public ID for deletion
}

export interface IProject extends Document {
  title: string;
  description: string;
  detailedDescription?: string;
  category: Types.ObjectId;
  images: IProjectImage[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  tags: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  projectDetails?: {
    area?: string;
    duration?: string;
    location?: string;
    client?: string;
    style?: string;
    budget?: string;
    completedDate?: Date;
  };
  features?: string[];
  materials?: string[];
  colors?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectImageSchema = new Schema<IProjectImage>({
  url: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail URL is required'],
    trim: true,
  },
  alt: {
    type: String,
    required: [true, 'Alt text is required'],
    trim: true,
    maxlength: [200, 'Alt text cannot exceed 200 characters'],
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  publicId: {
    type: String,
    trim: true,
  },
});

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  detailedDescription: {
    type: String,
    trim: true,
    maxlength: [5000, 'Detailed description cannot exceed 5000 characters'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  images: {
    type: [ProjectImageSchema],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  price: {
    min: {
      type: Number,
      min: [0, 'Minimum price cannot be negative'],
    },
    max: {
      type: Number,
      min: [0, 'Maximum price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD', 'EUR'],
    },
  },
  projectDetails: {
    area: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    style: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    completedDate: {
      type: Date,
    },
  },
  features: [{
    type: String,
    trim: true,
  }],
  materials: [{
    type: String,
    trim: true,
  }],
  colors: [{
    type: String,
    trim: true,
  }],
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot exceed 60 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    keywords: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for better performance
ProjectSchema.index({ category: 1, isActive: 1, sortOrder: 1 });
ProjectSchema.index({ isFeatured: 1, isActive: 1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ 'projectDetails.completedDate': -1 });

// Virtual populate for category details
ProjectSchema.virtual('categoryDetails', {
  ref: 'Category',
  localField: 'category',
  foreignField: '_id',
  justOne: true,
});

export default model<IProject>('Project', ProjectSchema);