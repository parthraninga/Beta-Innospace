# Logo Usage Guide

## Logo Files
- `logo.png` - Primary raster logo (currently used across all components)
- `logo.svg` - Vector logo (available as alternative, scalable format)

## Frontend Usage

### Available Locations
1. **Public Directory**: `/public/logo.png`, `/public/logo.svg`
   - Used for favicon and direct URL access
   - Accessible at: `http://localhost:5173/logo.svg`

2. **Assets Directory**: `/src/assets/logo.png`, `/src/assets/logo.svg`
   - Used for component imports
   - Using PNG format: `import logoPng from '../assets/logo.png'`

### Components Using Logo
- **Logo Component**: Use the centralized `src/components/common/Logo.tsx` component for consistent rendering across the app.
- **Header Component**: Uses `Logo` with larger (lg) size for prominence
- **Footer Component**: Uses `Logo` with medium size
- **HeroSection Component**: Uses `Logo` (image-only) next to heading
- **Admin Pages**: Use `Logo` for admin header and login

## Backend Usage

### Available Locations
- **Public Directory**: `/public/logo.png`, `/public/logo.svg`
- **Static URL**: `http://localhost:5000/static/logo.png`

## TypeScript Support
Asset type declarations are defined in `/src/types/assets.d.ts` for proper TypeScript support.

## Best Practices
1. Using PNG format via the `Logo` component for consistent rendering across components
2. SVG format is still available in `/src/assets` if vector versions are needed
3. Maintain consistent aspect ratio
4. Optimize file sizes for web delivery