import { Schema, model, Document, Types, CallbackError } from 'mongoose';

export interface IDesignImage {
  url: string;
  thumbnail: string;
  alt: string;
  sortOrder: number;
  publicId?: string; // Cloudinary public ID for deletion
}

export interface IDesign extends Document {
  title: string;
  description: string;
  category: Types.ObjectId;
  images: IDesignImage[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  tags: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const DesignImageSchema = new Schema<IDesignImage>({
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

const DesignSchema = new Schema<IDesign>({
  title: {
    type: String,
    required: [true, 'Design title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Design description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  images: {
    type: [DesignImageSchema],
    validate: {
      validator: function(images: IDesignImage[]) {
        return images && images.length > 0;
      },
      message: 'At least one image is required',
    },
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
DesignSchema.index({ category: 1, isActive: 1, sortOrder: 1 });
DesignSchema.index({ isFeatured: 1, isActive: 1 });
DesignSchema.index({ tags: 1 });
DesignSchema.index({ createdAt: -1 });

// Virtual populate for category details
DesignSchema.virtual('categoryDetails', {
  ref: 'Category',
  localField: 'category',
  foreignField: '_id',
  justOne: true,
});

export default model<IDesign>('Design', DesignSchema);