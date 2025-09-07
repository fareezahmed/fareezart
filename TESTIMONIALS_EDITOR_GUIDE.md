# Testimonials Editor Guide

## Overview
This guide explains how to manage testimonials in the Sanity CMS for the FareezArt portfolio website.

## Adding a New Testimonial

### 1. Access the CMS
1. Go to your Sanity Studio (usually at `/studio`)
2. Navigate to "Testimonials" in the sidebar
3. Click "Create" to add a new testimonial

### 2. Fill in the Required Fields

#### **Name** (Required)
- Enter the person's full name
- Maximum 100 characters
- Example: "Sarah Johnson"

#### **Role/Title** (Required)
- Enter their job title or role
- Maximum 100 characters
- Example: "Creative Director"

#### **Company** (Optional)
- Enter the company name
- Maximum 100 characters
- Example: "Design Studio Co."

#### **Quote** (Required)
- Enter the testimonial text
- Maximum 280 characters (enforced for optimal display)
- Keep it concise and impactful
- Example: "Working with FareezArt was an absolute pleasure. Their attention to detail and creative vision brought our project to life in ways we never imagined."

#### **Avatar** (Optional)
- Upload a professional headshot
- Recommended size: 200x200px or larger
- Use the crop/hotspot tool to focus on the person's face
- Add descriptive alt text for accessibility

#### **Display Priority** (Optional)
- Lower numbers appear first
- Leave empty for alphabetical ordering
- Example: 1, 2, 3...

#### **Featured Testimonial** (Optional)
- Check this box to highlight the testimonial
- Featured testimonials appear prominently

#### **Published Date** (Required)
- Set the date when the testimonial was received
- This affects the ordering of testimonials

### 3. Save and Publish
1. Click "Publish" to make the testimonial live
2. The testimonial will appear on the website immediately

## Managing Testimonials

### Ordering Testimonials
1. **By Priority**: Set lower numbers for testimonials you want to show first
2. **By Date**: Newer testimonials appear first when priority is the same
3. **Alphabetical**: Leave priority empty for alphabetical ordering by name

### Editing Existing Testimonials
1. Find the testimonial in the list
2. Click to open it
3. Make your changes
4. Click "Publish" to save

### Deleting Testimonials
1. Open the testimonial
2. Click "Delete" in the top menu
3. Confirm the deletion

## Site Settings Configuration

### Accessing Site Settings
1. Go to "Site Settings" in the sidebar
2. This is a singleton document (only one exists)

### Testimonials Settings
- **Auto-rotate Carousel**: Enable/disable automatic rotation
- **Auto-rotate Interval**: Set rotation speed (3-10 seconds)
- **Maximum Testimonials**: Limit how many testimonials to display (3-10)

### Featured Testimonials
- Add up to 6 testimonials to the featured list
- These will be prioritized in the display
- Drag and drop to reorder

## Preview Mode

### Enabling Preview
1. In Sanity Studio, click the "Preview" button
2. This opens the website with draft content visible
3. Make changes and see them live

### Preview URLs
- **Enable Preview**: `/api/preview?secret=YOUR_SECRET`
- **Disable Preview**: `POST /api/preview?secret=YOUR_SECRET`

## Best Practices

### Content Guidelines
- **Keep quotes concise**: Aim for 150-250 characters
- **Use professional language**: Avoid slang or overly casual tone
- **Include specific details**: Mention specific projects or outcomes
- **Get permission**: Always get written permission before publishing

### Image Guidelines
- **High quality**: Use clear, professional photos
- **Consistent style**: Maintain a cohesive look across all avatars
- **Proper sizing**: Upload images at least 200x200px
- **Accessibility**: Always add descriptive alt text

### SEO Considerations
- **Use real names**: Avoid generic titles like "Happy Customer"
- **Include company names**: This helps with local SEO
- **Regular updates**: Add new testimonials regularly to keep content fresh

## Troubleshooting

### Common Issues

#### **Quote Too Long**
- The system enforces a 280-character limit
- Edit the quote to be more concise
- Focus on the most impactful part

#### **Avatar Not Showing**
- Check that the image uploaded successfully
- Ensure alt text is provided
- Verify the image format (JPG, PNG, WebP)

#### **Testimonial Not Appearing**
- Check that it's published (not just saved as draft)
- Verify the published date is set
- Ensure all required fields are filled

#### **Preview Mode Not Working**
- Check that the preview secret is correct
- Ensure you have the proper API token
- Verify the preview URL is correct

### Getting Help
- Check the Sanity documentation for detailed guides
- Contact the development team for technical issues
- Use the Sanity community forums for general questions

## Content Safety

### Automatic Sanitization
- All text fields are automatically sanitized
- HTML tags are removed for security
- Special characters are properly escaped
- No raw HTML is rendered in the UI

### Validation Rules
- **Name**: Required, max 100 characters
- **Role**: Required, max 100 characters
- **Company**: Optional, max 100 characters
- **Quote**: Required, max 280 characters
- **Avatar**: Optional, with required alt text
- **Priority**: Optional, 0-999 integer
- **Published Date**: Required

This ensures consistent, safe content across the website.

