import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Category from '../models/Category';
import Design from '../models/Design';

// Sample data
const sampleCategories = [
  {
    name: 'Living Room',
    slug: 'living-room',
    description: 'Beautiful living room designs that blend comfort with style',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Cozy and elegant bedroom designs for restful living',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
  },
  {
    name: 'Kitchen',
    slug: 'kitchen',
    description: 'Modern kitchen designs that inspire culinary creativity',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
  },
  {
    name: 'Bathroom',
    slug: 'bathroom',
    description: 'Luxurious bathroom designs for relaxation and wellness',
    thumbnail: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500',
  },
];

const sampleDesigns = [
  {
    title: 'Modern Living Room',
    description: 'A contemporary living room with clean lines and neutral colors',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
        alt: 'Modern living room design',
        sortOrder: 0,
      },
      {
        url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300',
        alt: 'Living room interior view',
        sortOrder: 1,
      },
    ],
    tags: ['modern', 'minimalist', 'neutral'],
    price: { min: 45000, max: 55000, currency: 'INR' },
    isFeatured: true,
  },
  {
    title: 'Cozy Bedroom Retreat',
    description: 'A warm and inviting bedroom design with soft textures',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300',
        alt: 'Cozy bedroom design',
        sortOrder: 0,
      },
    ],
    tags: ['cozy', 'warm', 'comfortable'],
    price: { min: 30000, max: 40000, currency: 'INR' },
    isFeatured: false,
  },
  {
    title: 'Gourmet Kitchen',
    description: 'A chef-inspired kitchen with premium appliances and finishes',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300',
        alt: 'Modern kitchen design',
        sortOrder: 0,
      },
    ],
    tags: ['luxury', 'chef', 'gourmet'],
    price: { min: 70000, max: 80000, currency: 'INR' },
    isFeatured: true,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innospace';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Design.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user (let the model hash the password)
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@innospace.com',
      password: 'admin123', // Plain password - model will hash it
      role: 'admin',
    });
    console.log('Created admin user:', adminUser.email);

    // Create categories
    const categories = await Category.create(sampleCategories);
    console.log(`Created ${categories.length} categories`);

    // Create designs and assign to categories
    for (let i = 0; i < sampleDesigns.length; i++) {
      const designData = {
        ...sampleDesigns[i],
        category: categories[i % categories.length]._id,
        sortOrder: i,
      };
      await Design.create(designData);
    }
    console.log(`Created ${sampleDesigns.length} designs`);

    console.log('\\nSeed data created successfully!');
    console.log('\\nAdmin credentials:');
    console.log('Email: admin@innospace.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();