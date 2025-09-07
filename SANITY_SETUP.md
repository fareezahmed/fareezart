# Sanity CMS Setup Guide

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_PREVIEW_SECRET=your-preview-secret

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Sanity Project Setup

### Step 1: Create Sanity Project
1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Choose the dataset name (e.g., "production")
4. Note down your Project ID

### Step 2: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### Step 3: Initialize Sanity Studio
```bash
npx sanity init
```

### Step 4: Configure Studio
1. Choose your project
2. Select "Clean project with no predefined schemas"
3. The studio will be created in a `studio` folder

### Step 5: Copy Schema
Copy the project schema from `lib/schemas/project.ts` to your Sanity studio's schema folder.

## 3. API Token Setup

### Create API Token
1. Go to your Sanity project dashboard
2. Navigate to "API" section
3. Create a new token with "Editor" permissions
4. Copy the token to your `.env.local` file

## 4. Preview Mode Setup

### Preview Secret
Generate a random string for the preview secret:
```bash
openssl rand -base64 32
```

### Preview URLs
- **Enable Preview**: `/api/preview?secret=YOUR_SECRET&slug=PROJECT_SLUG`
- **Disable Preview**: `/api/preview?secret=YOUR_SECRET` (POST request)

## 5. Image Pipeline

### Sanity Image URLs
The system automatically generates optimized image URLs with:
- **Crop/Hotspot Support**: Visual cropping in Sanity Studio
- **Responsive Sizing**: Multiple sizes for different breakpoints
- **Format Optimization**: WebP conversion for better performance
- **Quality Control**: Configurable compression levels

### Example Image URL
```
https://cdn.sanity.io/images/PROJECT_ID/DATASET/IMAGE_ID-400x300.webp?w=400&h=300&q=80&fit=crop
```

## 6. Content Management

### Adding Projects
1. Go to your Sanity Studio (usually at `/studio`)
2. Create a new "Project" document
3. Fill in all required fields:
   - Title and slug
   - Roles (multi-select)
   - Cover image with alt text
   - Project brief
   - Process steps
   - Gallery items
   - Results and metrics

### Publishing Workflow
1. **Draft Mode**: Content is saved as draft
2. **Preview**: Use preview URLs to see draft content
3. **Publish**: Set `publishedAt` date to make content live
4. **Revalidation**: Content automatically updates on the site

## 7. Development Commands

### Start Sanity Studio
```bash
cd studio
npm run dev
```

### Start Next.js App
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 8. Deployment

### Vercel Deployment
1. Add environment variables to Vercel dashboard
2. Deploy your Next.js app
3. The Sanity Studio can be deployed separately or embedded

### Webhook Setup (Optional)
Set up webhooks in Sanity to trigger revalidation when content is published:
- **URL**: `https://your-domain.com/api/revalidate`
- **Trigger**: On document publish/unpublish

## 9. Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure your domain is whitelisted in Sanity
2. **Image Loading**: Check image URLs and permissions
3. **Preview Mode**: Verify secret token and API permissions
4. **Build Errors**: Ensure all environment variables are set

### Debug Mode
Enable debug logging by setting:
```bash
NODE_ENV=development
```

## 10. Performance Optimization

### Image Optimization
- Use appropriate image sizes for different breakpoints
- Enable WebP format for better compression
- Implement lazy loading for gallery images

### Caching Strategy
- Static generation for published content
- ISR (Incremental Static Regeneration) for dynamic updates
- CDN caching for images and assets

### SEO Optimization
- Dynamic meta tags based on content
- Open Graph images for social sharing
- Structured data for search engines
