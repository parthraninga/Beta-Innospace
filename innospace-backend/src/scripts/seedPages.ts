import mongoose from 'mongoose';
import Page from '../models/Page';
import { config } from 'dotenv';

// Load environment variables
config();

const seedPages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innospace');
    
    // Clear existing pages
    await Page.deleteMany({});
    
    const pages = [
      {
        slug: 'about',
        title: 'About Innospace',
        metaTitle: 'About Innospace - Interior Design Excellence',
        metaDescription: 'Learn about Innospace\'s journey, mission, and values in creating exceptional interior design solutions.',
        sections: [
          {
            id: 'hero-about',
            type: 'hero',
            title: 'About Innospace',
            subtitle: 'We innovate every corner of your space with creative interior design solutions that blend functionality with aesthetic appeal, transforming houses into homes and offices into inspiring workspaces.',
            settings: {
              alignment: 'center',
              spacing: 'large'
            },
            sortOrder: 0
          },
          {
            id: 'story-section',
            type: 'text',
            title: 'Our Story',
            content: 'Founded with a passion for transforming spaces, Innospace began as a vision to make exceptional interior design accessible to everyone. Our journey started with a simple belief that every space has the potential to inspire and elevate the lives of those who inhabit it.\n\nOver the years, we have grown from a small team of dedicated designers to a comprehensive interior design studio, serving clients across residential and commercial projects. Our commitment to innovation, quality, and personalized service has made us a trusted name in the industry.',
            settings: {
              spacing: 'large'
            },
            sortOrder: 1
          },
          {
            id: 'mission-vision',
            type: 'cards',
            title: 'Mission & Vision',
            items: [
              {
                id: 'mission',
                title: 'Our Mission',
                description: 'To create exceptional interior spaces that enhance the quality of life for our clients by combining innovative design concepts with practical functionality, sustainable practices, and personalized attention to detail.'
              },
              {
                id: 'vision',
                title: 'Our Vision',
                description: 'To be the leading interior design studio recognized for transforming spaces into inspiring environments that reflect our clients\' personalities while promoting wellness, productivity, and joy in everyday living.'
              }
            ],
            settings: {
              columns: 2,
              spacing: 'large'
            },
            sortOrder: 2
          },
          {
            id: 'core-values',
            type: 'cards',
            title: 'Our Core Values',
            subtitle: 'These fundamental principles guide every project and interaction we have with our clients.',
            items: [
              {
                id: 'innovation',
                title: 'Innovation',
                description: 'Constantly exploring new design trends and technologies to create cutting-edge solutions.',
                icon: 'lightbulb'
              },
              {
                id: 'passion',
                title: 'Passion',
                description: 'Bringing enthusiasm and creativity to every project, no matter the size or scope.',
                icon: 'heart'
              },
              {
                id: 'quality',
                title: 'Quality',
                description: 'Maintaining the highest standards in materials, craftsmanship, and client service.',
                icon: 'check-circle'
              },
              {
                id: 'collaboration',
                title: 'Collaboration',
                description: 'Working closely with clients to ensure their vision becomes reality.',
                icon: 'users'
              }
            ],
            settings: {
              columns: 4,
              spacing: 'large',
              alignment: 'center'
            },
            sortOrder: 3
          }
        ]
      },
      {
        slug: 'services',
        title: 'Our Services',
        metaTitle: 'Interior Design Services - Innospace',
        metaDescription: 'Comprehensive interior design services including residential, commercial, and consultation services.',
        sections: [
          {
            id: 'services-hero',
            type: 'hero',
            title: 'Our Services',
            subtitle: 'Comprehensive interior design services for your space',
            settings: {
              alignment: 'center',
              spacing: 'large'
            },
            sortOrder: 0
          },
          {
            id: 'services-grid',
            type: 'services',
            title: 'What We Do',
            subtitle: 'Our comprehensive interior design services cover every aspect of creating beautiful, functional spaces.',
            items: [
              {
                id: 'residential',
                title: 'Residential Design',
                description: 'Transform your home with personalized interior design solutions that reflect your lifestyle and preferences.',
                metadata: {
                  features: ['Living rooms & bedrooms', 'Kitchens & bathrooms', 'Home offices & studies', 'Outdoor spaces']
                }
              },
              {
                id: 'commercial',
                title: 'Commercial Design',
                description: 'Create inspiring work environments that enhance productivity and reflect your brand identity.',
                metadata: {
                  features: ['Office spaces', 'Retail stores', 'Restaurants & cafes', 'Hotels & hospitality']
                }
              },
              {
                id: 'consultation',
                title: 'Consultation Services',
                description: 'Expert advice and guidance to help you make informed decisions about your space.',
                metadata: {
                  features: ['Design consultation', 'Space planning', 'Color schemes', 'Furniture selection']
                }
              }
            ],
            settings: {
              columns: 3,
              spacing: 'large'
            },
            sortOrder: 1
          }
        ]
      },
      {
        slug: 'contact',
        title: 'Contact Us',
        metaTitle: 'Contact Innospace - Get In Touch',
        metaDescription: 'Get in touch with our interior design experts. Contact us for consultations, quotes, and project inquiries.',
        sections: [
          {
            id: 'contact-hero',
            type: 'hero',
            title: 'Contact Us',
            subtitle: 'Get in touch with our design experts',
            settings: {
              alignment: 'center',
              spacing: 'large'
            },
            sortOrder: 0
          },
          {
            id: 'contact-form',
            type: 'contact_form',
            title: 'Send us a message',
            subtitle: 'We\'d love to hear about your project. Fill out the form below and we\'ll get back to you within 24 hours.',
            settings: {
              spacing: 'large'
            },
            sortOrder: 1
          },
          {
            id: 'contact-info',
            type: 'cards',
            title: 'Get in Touch',
            items: [
              {
                id: 'phone',
                title: 'Phone',
                description: '+91 98765 43210',
                icon: 'phone'
              },
              {
                id: 'email',
                title: 'Email',
                description: 'hello@innospace.com',
                icon: 'mail'
              },
              {
                id: 'address',
                title: 'Address',
                description: '123 Design Street, Creative District, Mumbai 400001',
                icon: 'location'
              }
            ],
            settings: {
              columns: 3,
              spacing: 'medium',
              alignment: 'center'
            },
            sortOrder: 2
          }
        ]
      },
      {
        slug: 'faq',
        title: 'Frequently Asked Questions',
        metaTitle: 'FAQ - Innospace Interior Design',
        metaDescription: 'Find answers to common questions about our interior design services, process, and pricing.',
        sections: [
          {
            id: 'faq-hero',
            type: 'hero',
            title: 'Frequently Asked Questions',
            subtitle: 'Find answers to common questions about our services',
            settings: {
              alignment: 'center',
              spacing: 'large'
            },
            sortOrder: 0
          },
          {
            id: 'faq-list',
            type: 'faq',
            title: 'Common Questions',
            items: [
              {
                id: 'faq-1',
                title: 'How long does a typical interior design project take?',
                description: 'Project timelines vary depending on the scope and complexity. A single room typically takes 4-6 weeks, while a full home renovation can take 3-6 months. We provide detailed timelines during our initial consultation.'
              },
              {
                id: 'faq-2',
                title: 'Do you work within specific budgets?',
                description: 'Yes, we work with various budget ranges and will discuss your budget during our consultation to create a design plan that meets your needs and financial constraints.'
              },
              {
                id: 'faq-3',
                title: 'What is included in your design service?',
                description: 'Our comprehensive service includes space planning, color schemes, furniture selection, lighting design, material selection, and project coordination. We also provide 3D visualizations for major projects.'
              },
              {
                id: 'faq-4',
                title: 'Can I see examples of your previous work?',
                description: 'Absolutely! We have a portfolio of completed projects that we\'re happy to share. You can also view some of our work in our gallery section.'
              },
              {
                id: 'faq-5',
                title: 'Do you handle the procurement of furniture and materials?',
                description: 'Yes, we can handle all procurement and coordinate deliveries. We work with trusted suppliers and manufacturers to ensure quality and timely delivery.'
              },
              {
                id: 'faq-6',
                title: 'What happens if I\'m not satisfied with the design?',
                description: 'Client satisfaction is our priority. We work closely with you throughout the process and offer revisions. We won\'t proceed to the next phase until you\'re completely happy with the design.'
              }
            ],
            settings: {
              spacing: 'large'
            },
            sortOrder: 1
          }
        ]
      },
      {
        slug: 'projects',
        title: 'Recent Projects',
        metaTitle: 'Our Projects - Innospace Interior Design Portfolio',
        metaDescription: 'Explore our latest completed interior design projects showcasing residential and commercial spaces.',
        sections: [
          {
            id: 'projects-hero',
            type: 'hero',
            title: 'Recent Projects',
            subtitle: 'Explore our latest completed interior design projects',
            settings: {
              alignment: 'center',
              spacing: 'large'
            },
            sortOrder: 0
          },
          {
            id: 'projects-showcase',
            type: 'projects',
            title: 'Featured Work',
            subtitle: 'Take a look at some of our recent successful projects',
            settings: {
              columns: 3,
              spacing: 'large'
            },
            sortOrder: 1
          }
        ]
      }
    ];

    await Page.insertMany(pages);
    console.log('✅ Pages seeded successfully');
    
    // Display created pages
    const createdPages = await Page.find({}).select('slug title');
    console.log('Created pages:', createdPages);
    
  } catch (error) {
    console.error('❌ Error seeding pages:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run if called directly
if (require.main === module) {
  seedPages();
}

export { seedPages };