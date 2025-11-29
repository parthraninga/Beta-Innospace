import { Schema, model, Document } from 'mongoose';

export interface IPageSection {
  id: string;
  type: 'hero' | 'text' | 'cards' | 'list' | 'image' | 'contact_form' | 'faq' | 'projects' | 'services';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: {
    url: string;
    alt: string;
    publicId?: string;
  };
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    image?: {
      url: string;
      alt: string;
      publicId?: string;
    };
    link?: string;
    icon?: string;
    metadata?: Record<string, any>;
  }>;
  settings?: {
    backgroundColor?: string;
    textColor?: string;
    columns?: number;
    spacing?: 'small' | 'medium' | 'large';
    alignment?: 'left' | 'center' | 'right';
  };
  sortOrder: number;
}

export interface IPage extends Document {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  sections: IPageSection[];
  seo?: {
    keywords?: string[];
    ogImage?: string;
    ogDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PageSectionSchema = new Schema<IPageSection>({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['hero', 'text', 'cards', 'list', 'image', 'contact_form', 'faq', 'projects', 'services'],
  },
  title: {
    type: String,
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  image: {
    url: String,
    alt: String,
    publicId: String,
  },
  items: [{
    id: String,
    title: String,
    description: String,
    image: {
      url: String,
      alt: String,
      publicId: String,
    },
    link: String,
    icon: String,
    metadata: Schema.Types.Mixed,
  }],
  settings: {
    backgroundColor: String,
    textColor: String,
    columns: {
      type: Number,
      min: 1,
      max: 6,
      default: 1,
    },
    spacing: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    alignment: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'left',
    },
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const PageSchema = new Schema<IPage>({
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
  },
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
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
  isActive: {
    type: Boolean,
    default: true,
  },
  sections: {
    type: [PageSectionSchema],
    default: [],
  },
  seo: {
    keywords: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    ogImage: String,
    ogDescription: String,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for better performance
PageSchema.index({ slug: 1 });
PageSchema.index({ isActive: 1 });
PageSchema.index({ updatedAt: -1 });

export default model<IPage>('Page', PageSchema);