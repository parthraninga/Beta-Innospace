import mongoose from 'mongoose';
import Design from '../models/Design';
import Category from '../models/Category';
import { connectDB } from '../services/database';

const seedProjects = async () => {
  try {
    await connectDB();

    // Clear existing designs
    await Design.deleteMany({});
    console.log('Cleared existing designs');

    // Get or create categories
    const categories = await Category.find({});
    if (categories.length === 0) {
      console.log('No categories found. Please seed categories first.');
      return;
    }

    const livingRoomCategory = categories.find(cat => cat.slug === 'living-room');
    const kitchenCategory = categories.find(cat => cat.slug === 'kitchen');
    const bedroomCategory = categories.find(cat => cat.slug === 'bedroom');

    const projects = [
      {
        title: "Modern Luxury Living Room",
        description: "A sophisticated living space with contemporary furniture and premium finishes",
        detailedDescription: "This stunning living room transformation features clean lines, neutral tones, and carefully curated furniture pieces. The space combines comfort with elegance, incorporating natural materials and strategic lighting to create a warm yet modern atmosphere. Premium Italian leather furniture and designer lighting fixtures elevate the overall aesthetic.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Modern luxury living room with contemporary furniture",
            sortOrder: 1
          },
          {
            url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Living room detail view",
            sortOrder: 2
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 1,
        tags: ["modern", "luxury", "contemporary", "neutral"],
        price: {
          min: 200000,
          max: 500000,
          currency: "INR"
        },
        projectDetails: {
          area: "350 sq ft",
          duration: "6 weeks",
          location: "Mumbai, Maharashtra",
          client: "Private Residence",
          style: "Contemporary Modern",
          budget: "₹3,50,000",
          completedDate: new Date("2024-10-15")
        },
        features: ["Premium Italian leather sofa", "Designer lighting", "Custom built-in storage", "Natural wood accents"],
        materials: ["Italian leather", "Teak wood", "Marble flooring", "Linen curtains"],
        colors: ["Warm white", "Charcoal gray", "Natural wood", "Accent gold"]
      },
      {
        title: "Gourmet Kitchen Design",
        description: "A chef-inspired kitchen with premium appliances and elegant finishes",
        detailedDescription: "This kitchen renovation transforms the heart of the home into a culinary paradise. Featuring top-of-the-line appliances, custom cabinetry, and a spacious island with waterfall countertop. The design maximizes both functionality and style with smart storage solutions and professional-grade equipment.",
        category: kitchenCategory?._id || categories[1]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Gourmet kitchen with premium appliances",
            sortOrder: 1
          },
          {
            url: "https://images.unsplash.com/photo-1565183997392-65fcf4e32145?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1565183997392-65fcf4e32145?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Kitchen island detail",
            sortOrder: 2
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 2,
        tags: ["kitchen", "gourmet", "modern", "appliances"],
        price: {
          min: 400000,
          max: 800000,
          currency: "INR"
        },
        projectDetails: {
          area: "200 sq ft",
          duration: "8 weeks",
          location: "Delhi, NCR",
          client: "Private Residence",
          style: "Modern Transitional",
          budget: "₹6,00,000",
          completedDate: new Date("2024-11-01")
        },
        features: ["Waterfall countertop", "Smart appliances", "Custom cabinetry", "Under-cabinet lighting"],
        materials: ["Quartz countertops", "Soft-close drawers", "Stainless steel appliances", "Ceramic backsplash"],
        colors: ["White", "Charcoal", "Stainless steel", "Natural wood"]
      },
      {
        title: "Serene Master Bedroom",
        description: "A peaceful bedroom retreat with elegant design and cozy ambiance",
        detailedDescription: "This master bedroom design focuses on creating a tranquil sanctuary for rest and relaxation. Soft color palette, luxurious textiles, and carefully planned lighting work together to establish a serene atmosphere. Custom furniture and built-in wardrobes maximize space while maintaining clean aesthetics.",
        category: bedroomCategory?._id || categories[2]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Serene master bedroom design",
            sortOrder: 1
          },
          {
            url: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Bedroom detail with custom furniture",
            sortOrder: 2
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 3,
        tags: ["bedroom", "serene", "luxury", "cozy"],
        price: {
          min: 150000,
          max: 350000,
          currency: "INR"
        },
        projectDetails: {
          area: "280 sq ft",
          duration: "5 weeks",
          location: "Bangalore, Karnataka",
          client: "Private Residence",
          style: "Contemporary Minimalist",
          budget: "₹2,50,000",
          completedDate: new Date("2024-09-20")
        },
        features: ["Custom built-in wardrobe", "Ambient lighting", "Premium bedding", "Reading nook"],
        materials: ["Engineered wood", "Linen fabrics", "Marble surfaces", "Brass hardware"],
        colors: ["Soft beige", "Warm white", "Natural wood", "Sage green"]
      },
      {
        title: "Executive Office Space",
        description: "Professional office design with modern aesthetics and functionality",
        detailedDescription: "A sophisticated office space designed for productivity and professional meetings. The design incorporates ergonomic furniture, smart technology integration, and premium finishes to create an inspiring work environment.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Executive office space design",
            sortOrder: 1
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 4,
        tags: ["office", "executive", "professional", "modern"],
        price: {
          min: 300000,
          max: 600000,
          currency: "INR"
        },
        projectDetails: {
          area: "400 sq ft",
          duration: "6 weeks",
          location: "Chennai, Tamil Nadu",
          client: "Corporate Office",
          style: "Modern Professional",
          budget: "₹4,50,000",
          completedDate: new Date("2024-08-30")
        },
        features: ["Ergonomic furniture", "Smart lighting", "Conference area", "Storage solutions"],
        materials: ["Glass surfaces", "Metal frames", "Leather upholstery", "Wood veneer"],
        colors: ["Charcoal gray", "White", "Chrome", "Deep blue"]
      },
      {
        title: "Cozy Dining Room",
        description: "Warm and inviting dining space perfect for family gatherings",
        detailedDescription: "This dining room design creates an intimate setting for meals and conversations. Natural materials, warm lighting, and comfortable seating combine to make every meal special.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Cozy dining room design",
            sortOrder: 1
          }
        ],
        isActive: true,
        isFeatured: false,
        sortOrder: 5,
        tags: ["dining", "cozy", "family", "warm"],
        price: {
          min: 100000,
          max: 250000,
          currency: "INR"
        },
        projectDetails: {
          area: "180 sq ft",
          duration: "4 weeks",
          location: "Pune, Maharashtra",
          client: "Private Residence",
          style: "Traditional Modern",
          budget: "₹1,75,000",
          completedDate: new Date("2024-07-15")
        },
        features: ["Custom dining table", "Statement lighting", "Built-in buffet", "Comfortable seating"],
        materials: ["Solid wood", "Natural fibers", "Ceramic tiles", "Brass accents"],
        colors: ["Warm brown", "Cream", "Forest green", "Gold accents"]
      },
      {
        title: "Minimalist Bathroom",
        description: "Clean and modern bathroom with spa-like features",
        detailedDescription: "A bathroom transformation that emphasizes clean lines, natural materials, and spa-like amenities. The design maximizes space while creating a luxurious bathing experience.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Minimalist bathroom design",
            sortOrder: 1
          }
        ],
        isActive: true,
        isFeatured: false,
        sortOrder: 6,
        tags: ["bathroom", "minimalist", "spa", "modern"],
        price: {
          min: 120000,
          max: 300000,
          currency: "INR"
        },
        projectDetails: {
          area: "80 sq ft",
          duration: "5 weeks",
          location: "Hyderabad, Telangana",
          client: "Private Residence",
          style: "Minimalist Modern",
          budget: "₹2,10,000",
          completedDate: new Date("2024-06-10")
        },
        features: ["Rain shower", "Floating vanity", "Smart mirrors", "Heated floors"],
        materials: ["Porcelain tiles", "Glass panels", "Stone countertops", "Chrome fixtures"],
        colors: ["Pure white", "Light gray", "Natural stone", "Chrome"]
      }
    ];

    const createdProjects = await Design.insertMany(projects);
    console.log(`Created ${createdProjects.length} projects successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding projects:', error);
    mongoose.connection.close();
  }
};

export default seedProjects;

// Run if called directly
if (require.main === module) {
  seedProjects();
}