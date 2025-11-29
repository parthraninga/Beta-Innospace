# Innospace CMS Usage Guide

## Overview
The Innospace CMS (Content Management System) allows you to manage your interior design portfolio through both a backend API and a frontend admin panel.

## Architecture

### Backend API (Port 5000)
- **Framework**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **File Upload**: Ready for Cloudinary integration
- **API Base URL**: `http://localhost:5000/api`

### Frontend Admin Panel (Port 5173)
- **Framework**: React + TypeScript + Vite
- **UI**: Tailwind CSS
- **State Management**: React Query
- **Admin URL**: `http://localhost:5173/admin`

## Getting Started

### 1. Start the Servers

**Backend:**
```bash
cd innospace-backend
npm run dev
```

**Frontend:**
```bash
cd innospace-frontend  
npm run dev
```

### 2. Access the Admin Panel
- Visit: `http://localhost:5173/admin`
- Currently no authentication is enforced (development mode)

## CMS Features

### Categories Management
- **Location**: `/admin/categories`
- **Features**:
  - Create new design categories (Kitchen, Living Room, etc.)
  - Edit category details (name, slug, description, thumbnail)
  - Toggle active/inactive status
  - Reorder categories with drag-and-drop
  - Delete categories (only if no designs exist)

### Designs Management
- **Location**: `/admin/designs` (planned)
- **Features**:
  - Upload design images
  - Add project descriptions
  - Assign to categories
  - Set featured designs
  - Manage visibility
  - Organize with tags

## API Endpoints

### Authentication
```
POST /api/auth/login      # Admin login
GET  /api/auth/me        # Get current user
```

### Categories (Admin)
```
GET    /api/admin/categories           # List all categories
POST   /api/admin/categories           # Create category
GET    /api/admin/categories/:id       # Get single category
PUT    /api/admin/categories/:id       # Update category
DELETE /api/admin/categories/:id       # Delete category
PUT    /api/admin/categories/:id/toggle # Toggle active status
PUT    /api/admin/categories/reorder    # Reorder categories
```

### Designs (Admin)
```
GET    /api/admin/designs              # List all designs
POST   /api/admin/designs              # Create design
GET    /api/admin/designs/:id          # Get single design
PUT    /api/admin/designs/:id          # Update design
DELETE /api/admin/designs/:id          # Delete design
PUT    /api/admin/designs/:id/toggle   # Toggle active status
PUT    /api/admin/designs/reorder      # Reorder designs
```

### Public API (For Frontend)
```
GET /api/categories                    # Get active categories
GET /api/categories/:slug              # Get category by slug
GET /api/designs                       # Get all active designs
GET /api/designs/:categorySlug         # Get designs by category
```

## Database Schema

### Category Model
```javascript
{
  name: String,           // "Living Room"
  slug: String,           // "living-room" 
  description: String,    // Category description
  thumbnail: String,      // Image URL
  isActive: Boolean,      // Visibility status
  sortOrder: Number,      // Display order
  createdAt: Date,
  updatedAt: Date
}
```

### Design Model
```javascript
{
  title: String,          // "Modern Kitchen Design"
  description: String,    // Project description
  category: ObjectId,     // Reference to Category
  images: [String],       // Array of image URLs
  tags: [String],         // ["modern", "minimalist"]
  price: Number,          // Optional price
  isFeatured: Boolean,    // Featured on homepage
  isActive: Boolean,      // Visibility status
  sortOrder: Number,      // Display order within category
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### 1. Create a New Category

**API Call:**
```bash
curl -X POST http://localhost:5000/api/admin/categories \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Modern Kitchen",
    "slug": "modern-kitchen", 
    "description": "Contemporary kitchen designs with clean lines",
    "thumbnail": "https://example.com/kitchen-thumb.jpg"
  }'
```

**Admin Panel:**
1. Go to `/admin/categories`
2. Click "Add Category" 
3. Fill in the form
4. Click "Create"

### 2. Add a Design

**API Call:**
```bash
curl -X POST http://localhost:5000/api/admin/designs \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Luxury Kitchen Renovation",
    "description": "Complete kitchen makeover with marble countertops",
    "category": "CATEGORY_ID_HERE",
    "images": [
      "https://example.com/kitchen1.jpg",
      "https://example.com/kitchen2.jpg"
    ],
    "tags": ["luxury", "marble", "modern"],
    "isFeatured": true
  }'
```

### 3. Fetch Public Data for Frontend

**Get Categories:**
```javascript
const response = await fetch('/api/categories');
const { data: categories } = await response.json();
```

**Get Designs by Category:**
```javascript
const response = await fetch('/api/designs/modern-kitchen');
const { data } = await response.json();
const { category, designs } = data;
```

## Development Status

### ✅ Completed
- Backend API structure
- MongoDB models and controllers
- Admin panel layout and navigation
- Categories management page
- Basic authentication structure

### 🚧 In Progress  
- File upload with Cloudinary
- Design management page
- Authentication flow
- Image optimization

### 📋 Planned
- Drag-and-drop reordering
- Bulk operations
- Analytics dashboard
- Settings page
- User management

## Next Steps

1. **Complete the CMS**: Finish the designs management page
2. **Add Authentication**: Implement login/logout functionality
3. **File Upload**: Integrate Cloudinary for image management
4. **Frontend Integration**: Connect the public gallery to CMS data
5. **Production Deploy**: Set up hosting and environment variables

## Support

For questions or issues with the CMS:
1. Check the terminal logs for backend errors
2. Use browser DevTools for frontend debugging
3. Verify API endpoints with tools like Postman
4. Check MongoDB connection and data structure

The CMS provides full control over your interior design portfolio with a user-friendly interface and robust API.