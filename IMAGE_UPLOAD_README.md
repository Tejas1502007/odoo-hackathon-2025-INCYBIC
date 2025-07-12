# Image Upload Functionality

This document describes the image upload functionality implemented for the ReWear app.

## Features

### ✅ Implemented Features

1. **Real File Upload**: Users can now select and upload actual image files from their device
2. **Multiple Image Support**: Upload up to 5 images per item listing
3. **File Validation**: 
   - File type validation (JPEG, JPG, PNG, WebP)
   - File size validation (max 5MB per image)
   - Maximum file count validation
4. **Image Preview**: Real-time preview of uploaded images
5. **Image Management**: Remove individual images with hover controls
6. **Progress Feedback**: Toast notifications for upload success/failure
7. **Responsive Design**: Works on desktop and mobile devices

### 🎯 Key Components

#### 1. ImageUpload Component (`src/components/ImageUpload.tsx`)
A reusable component that handles:
- File selection and validation
- Image preview generation
- Upload progress feedback
- Image removal functionality

**Usage:**
```tsx
import { ImageUpload } from '@/components/ImageUpload';

<ImageUpload
  images={images}
  onImagesChange={setImages}
  maxFiles={5}
  maxSize={5 * 1024 * 1024} // 5MB
  allowedTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
  required={true}
  label="Item Photos"
/>
```

#### 2. Image Utilities (`src/lib/imageUtils.ts`)
Utility functions for:
- Image validation
- File to base64 conversion
- Image resizing
- Thumbnail generation
- File size formatting
- WebP support detection

**Key Functions:**
```typescript
// Validate a single image
validateImage(file, maxSize, allowedTypes)

// Validate multiple images
validateImages(files, maxFiles, maxSize, allowedTypes)

// Convert files to base64 data URLs
filesToDataUrls(files)

// Resize images
resizeImage(file, options)

// Format file size
formatFileSize(bytes)
```

#### 3. Updated AddItem Page (`src/pages/AddItem.tsx`)
- Integrated the ImageUpload component
- Added image validation before form submission
- Converts uploaded files to base64 for storage
- Requires at least one image for item listing

## How It Works

### 1. File Selection
- Users click "Choose Files" button
- File picker opens with image type restrictions
- Multiple files can be selected at once

### 2. Validation
- File type is checked against allowed types
- File size is validated (max 5MB)
- Total file count is verified (max 5)

### 3. Preview Generation
- Object URLs are created for immediate preview
- Images are displayed in a responsive grid
- File names and sizes are shown

### 4. Storage
- Images are converted to base64 data URLs
- Stored in the data store with the item
- In a real application, these would be uploaded to a server/CDN

## Technical Implementation

### File Handling
```typescript
// File selection
const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  // Validation and processing
};

// Preview generation
useEffect(() => {
  const urls = images.map(file => URL.createObjectURL(file));
  setImageUrls(urls);
  
  // Cleanup
  return () => urls.forEach(url => URL.revokeObjectURL(url));
}, [images]);
```

### Validation
```typescript
// File type validation
if (!allowedTypes.includes(file.type)) {
  // Show error toast
}

// File size validation
if (file.size > maxSize) {
  // Show error toast
}
```

### Base64 Conversion
```typescript
// Convert files to base64 for storage
const imageDataUrls = await filesToDataUrls(images);
```

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ File API support
- ✅ Canvas API for image processing
- ✅ WebP format support (with fallback)

## Future Enhancements

### 🚀 Potential Improvements

1. **Image Compression**: Automatic compression before upload
2. **Drag & Drop**: Drag and drop file upload
3. **Image Cropping**: Built-in image cropping tool
4. **Upload Progress**: Real upload progress indicators
5. **Cloud Storage**: Integration with cloud storage services
6. **Image Optimization**: Automatic format conversion (WebP)
7. **Thumbnail Generation**: Automatic thumbnail creation
8. **Batch Processing**: Process multiple images simultaneously

### 🔧 Technical Improvements

1. **Lazy Loading**: Implement lazy loading for image previews
2. **Memory Management**: Better cleanup of object URLs
3. **Error Recovery**: Retry mechanisms for failed uploads
4. **Accessibility**: Better keyboard navigation and screen reader support
5. **Performance**: Optimize image processing for large files

## Usage Examples

### Basic Usage
```tsx
const [images, setImages] = useState<File[]>([]);

<ImageUpload
  images={images}
  onImagesChange={setImages}
  required={true}
  label="Upload Images"
/>
```

### Custom Configuration
```tsx
<ImageUpload
  images={images}
  onImagesChange={setImages}
  maxFiles={10}
  maxSize={10 * 1024 * 1024} // 10MB
  allowedTypes={['image/jpeg', 'image/png']}
  required={false}
  label="Product Photos"
  className="custom-upload-area"
/>
```

### Form Integration
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (images.length === 0) {
    toast({
      title: "No images",
      description: "Please upload at least one image.",
      variant: "destructive",
    });
    return;
  }
  
  const imageDataUrls = await filesToDataUrls(images);
  // Submit form with imageDataUrls
};
```

## Troubleshooting

### Common Issues

1. **Images not uploading**: Check file type and size restrictions
2. **Preview not showing**: Ensure browser supports File API
3. **Memory issues**: Large images may cause performance problems
4. **Validation errors**: Check console for specific error messages

### Debug Tips

1. Check browser console for errors
2. Verify file types are in allowed list
3. Ensure file sizes are within limits
4. Test with different image formats
5. Check browser File API support

## Security Considerations

1. **File Type Validation**: Always validate file types on both client and server
2. **File Size Limits**: Implement reasonable size limits
3. **Content Scanning**: Consider virus scanning for uploaded files
4. **Access Control**: Implement proper access controls for uploaded content
5. **Data Sanitization**: Sanitize file names and metadata

---

This implementation provides a robust, user-friendly image upload system that can be easily extended and customized for future needs. 