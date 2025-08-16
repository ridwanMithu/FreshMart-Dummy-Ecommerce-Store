# FreshMart E-commerce Website

A modern e-commerce website built with React, TypeScript, and Vite.

## Features

- Product browsing with search and filtering
- Product details page
- Shopping cart functionality
- User authentication (login/logout)
- User profile management
- Admin panel for adding products
- Responsive design for all device sizes

## Deployment

This project is configured for deployment on Netlify. The following files are important for deployment:

- `netlify.toml` - Contains build settings for Netlify
- `public/_redirects` - Handles client-side routing for single-page applications

### Netlify Deployment Settings

When deploying to Netlify, use these settings:

1. **Build Command**: `cd shadcn-ui && pnpm run build`
2. **Publish Directory**: `shadcn-ui/dist`

### Customizing Product Data

Product data is stored in `src/lib/productData.json`. To add more products:

1. Add new product objects to the JSON array
2. Each product should have the following properties:
   - `id` (string): Unique identifier
   - `name` (string): Product name
   - `price` (number): Product price
   - `category` (string): Product category
   - `image` (string): URL to product image
   - `description` (string): Product description
   - `rating` (number): Product rating (0-5)
   - `reviews` (number): Number of reviews

After updating the JSON file, update the `src/lib/products.ts` file to include the new products in the `initializeProducts` function.

## Development

To run the development server:

```bash
cd shadcn-ui
npm install
npm run dev
```

## Building for Production

To create a production build:

```bash
cd shadcn-ui
npm run build
```

The built files will be in the `dist` directory.
