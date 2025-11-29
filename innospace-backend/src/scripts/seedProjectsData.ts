import mongoose from 'mongoose';
import Project from '../models/Project';
import Category from '../models/Category';
import { connectDB } from '../services/database';

const seedProjectsData = async () => {
  try {
    await connectDB();

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

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
        title: "Luxury Mumbai Penthouse",
        description: "Complete interior design transformation of a 3000 sq ft penthouse with panoramic city views",
        detailedDescription: "This luxury penthouse project involved a complete redesign of the interior spaces to create a sophisticated urban retreat. The design incorporates high-end materials, custom furniture, and smart home technology while maintaining the stunning city views through floor-to-ceiling windows.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Luxury living room with city views",
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
        tags: ["luxury", "penthouse", "city-views", "contemporary"],
        price: {
          min: 2500000,
          max: 3500000,
          currency: "INR"
        },
        projectDetails: {
          area: "3000 sq ft",
          duration: "4 months",
          location: "Mumbai, Maharashtra",
          client: "Mr. & Mrs. Sharma",
          style: "Contemporary Luxury",
          budget: "₹35,00,000",
          completedDate: new Date("2024-10-15")
        },
        features: ["Custom Italian furniture", "Smart home automation", "Premium lighting design", "Marble flooring"],
        materials: ["Italian marble", "Teak wood", "Italian leather", "Crystal fixtures"],
        colors: ["Warm white", "Gold accents", "Deep navy", "Natural wood"]
      },
      {
        title: "Modern Delhi Villa Kitchen",
        description: "Complete kitchen renovation with premium appliances and contemporary design",
        detailedDescription: "A comprehensive kitchen transformation featuring state-of-the-art appliances, custom cabinetry, and a functional island design. The project focused on creating a perfect blend of functionality and aesthetics for a large family.",
        category: kitchenCategory?._id || categories[1]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Modern kitchen with premium appliances",
            sortOrder: 1
          },
          {
            url: "https://images.unsplash.com/photo-1565183997392-65fcf4e32145?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1565183997392-65fcf4e32145?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Kitchen island with breakfast bar",
            sortOrder: 2
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 2,
        tags: ["kitchen", "modern", "villa", "appliances"],
        price: {
          min: 800000,
          max: 1200000,
          currency: "INR"
        },
        projectDetails: {
          area: "450 sq ft",
          duration: "6 weeks",
          location: "Delhi, NCR",
          client: "The Gupta Family",
          style: "Modern Contemporary",
          budget: "₹12,00,000",
          completedDate: new Date("2024-11-01")
        },
        features: ["German appliances", "Soft-close cabinetry", "Under-cabinet lighting", "Breakfast bar"],
        materials: ["Quartz countertops", "German hardware", "Ceramic tiles", "Stainless steel"],
        colors: ["White", "Charcoal gray", "Stainless steel", "Warm wood"]
      },
      {
        title: "Bangalore Master Suite",
        description: "Elegant master bedroom and bathroom suite design for a modern family",
        detailedDescription: "A complete master suite renovation including bedroom, walk-in closet, and en-suite bathroom. The design emphasizes comfort, luxury, and functionality with a serene color palette and premium finishes.",
        category: bedroomCategory?._id || categories[2]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Elegant master bedroom design",
            sortOrder: 1
          },
          {
            url: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Master suite with walk-in closet",
            sortOrder: 2
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 3,
        tags: ["master-suite", "bedroom", "luxury", "bangalore"],
        price: {
          min: 600000,
          max: 900000,
          currency: "INR"
        },
        projectDetails: {
          area: "500 sq ft",
          duration: "8 weeks",
          location: "Bangalore, Karnataka",
          client: "Dr. & Mrs. Reddy",
          style: "Modern Minimalist",
          budget: "₹8,50,000",
          completedDate: new Date("2024-09-20")
        },
        features: ["Walk-in closet", "En-suite bathroom", "Reading nook", "Smart lighting"],
        materials: ["Engineered wood", "Natural stone", "Premium textiles", "Glass panels"],
        colors: ["Soft beige", "Warm gray", "Natural wood", "White accents"]
      },
      {
        title: "Chennai Corporate Office",
        description: "Modern office space design for a tech startup with 50+ employees",
        detailedDescription: "A comprehensive office design project creating collaborative workspaces, meeting rooms, and recreational areas. The design promotes productivity while maintaining a modern and energetic atmosphere.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Modern corporate office space",
            sortOrder: 1
          }
        ],
        isActive: true,
        isFeatured: true,
        sortOrder: 4,
        tags: ["office", "corporate", "tech-startup", "modern"],
        price: {
          min: 1500000,
          max: 2000000,
          currency: "INR"
        },
        projectDetails: {
          area: "8000 sq ft",
          duration: "10 weeks",
          location: "Chennai, Tamil Nadu",
          client: "TechCorp Solutions Pvt Ltd",
          style: "Modern Industrial",
          budget: "₹20,00,000",
          completedDate: new Date("2024-08-30")
        },
        features: ["Open workspaces", "Meeting pods", "Recreational area", "Smart conference rooms"],
        materials: ["Glass partitions", "Metal frames", "Acoustic panels", "Epoxy flooring"],
        colors: ["Corporate blue", "White", "Gray accents", "Green plants"]
      },
      {
        title: "Pune Family Restaurant",
        description: "Warm and welcoming restaurant interior design for a family dining establishment",
        detailedDescription: "Interior design for a 120-seater family restaurant focusing on creating a warm, inviting atmosphere. The design incorporates natural materials and comfortable seating arrangements to enhance the dining experience.",
        category: livingRoomCategory?._id || categories[0]._id,
        images: [
          {
            url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Warm family restaurant interior",
            sortOrder: 1
          }
        ],
        isActive: true,
        isFeatured: false,
        sortOrder: 5,
        tags: ["restaurant", "family-dining", "commercial", "warm"],
        price: {
          min: 800000,
          max: 1200000,
          currency: "INR"
        },
        projectDetails: {
          area: "2500 sq ft",
          duration: "12 weeks",
          location: "Pune, Maharashtra",
          client: "Taste of Home Restaurant",
          style: "Contemporary Rustic",
          budget: "₹12,00,000",
          completedDate: new Date("2024-07-15")
        },
        features: ["Custom seating", "Ambient lighting", "Open kitchen view", "Private dining area"],
        materials: ["Reclaimed wood", "Natural stone", "Warm metals", "Comfortable upholstery"],
        colors: ["Warm brown", "Cream", "Copper accents", "Forest green"]
      }
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`Created ${createdProjects.length} projects successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding projects:', error);
    mongoose.connection.close();
  }
};

export default seedProjectsData;

// Run if called directly
if (require.main === module) {
  seedProjectsData();
}