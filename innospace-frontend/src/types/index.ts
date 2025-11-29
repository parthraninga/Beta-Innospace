export interface Design {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: DesignImage[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  tags: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DesignImage {
  url: string;
  thumbnail: string;
  alt: string;
  sortOrder: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: Category;
  images: DesignImage[];
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
    completedDate?: string;
  };
  features?: string[];
  materials?: string[];
  colors?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
}

export interface QuoteRequest extends ContactForm {
  projectType: string;
  budget: string;
  timeline: string;
  address: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  projectType: string;
  message?: string;
}

export interface Review {
  _id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Supplier {
  _id: string;
  name: string;
  logo: string;
  website: string;
  isActive: boolean;
  sortOrder: number;
}