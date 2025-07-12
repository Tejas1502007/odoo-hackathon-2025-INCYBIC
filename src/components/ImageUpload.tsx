import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  required?: boolean;
  label?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  required = false,
  label = 'Images',
  className = ''
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Create object URLs for image previews
  useEffect(() => {
    const urls = images.map(file => URL.createObjectURL(file));
    setImageUrls(urls);

    // Cleanup object URLs when component unmounts or images change
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      const newFiles: File[] = [];
      const maxSizeMB = maxSize / (1024 * 1024);

      // Check if adding these files would exceed the limit
      if (images.length + files.length > maxFiles) {
        toast({
          title: "Too many images",
          description: `You can upload a maximum of ${maxFiles} images.`,
          variant: "destructive",
        });
        return;
      }

      Array.from(files).forEach((file) => {
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: `Please upload only ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} images.`,
            variant: "destructive",
          });
          return;
        }

        // Validate file size
        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: `Each image must be smaller than ${maxSizeMB}MB.`,
            variant: "destructive",
          });
          return;
        }

        newFiles.push(file);
      });

      if (newFiles.length > 0) {
        onImagesChange([...images, ...newFiles]);
        toast({
          title: "Images uploaded",
          description: `${newFiles.length} image(s) added successfully.`,
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to remove this image?')) {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
      toast({
        title: "Image removed",
        description: "Image has been removed from your listing.",
      });
    }
  };

  const removeAllImages = () => {
    if (images.length === 0) return;
    
    // Show confirmation dialog
    if (window.confirm(`Are you sure you want to remove all ${images.length} images?`)) {
      onImagesChange([]);
      toast({
        title: "All images removed",
        description: "All images have been removed from your listing.",
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>
        {label} {required && '*'}
      </Label>
      
      <div className="border-2 border-dashed border-border rounded-lg p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Upload up to {maxFiles} photos ({allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}, max {formatFileSize(maxSize)} each)
            </p>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || images.length >= maxFiles}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Choose Files"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={allowedTypes.join(',')}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {images.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {images.length}/{maxFiles} images uploaded
            </p>
          )}
        </div>
        
        {imageUrls.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium">Uploaded Images</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeAllImages}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="mr-1 h-3 w-3" />
                Remove All
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={url} 
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-border"
                  />
                  
                  {/* Delete Button - Always visible with better styling */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 border-2 border-white"
                    title="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  {/* Image overlay with info */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg">
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {images[index]?.name?.substring(0, 15)}...
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {formatFileSize(images[index]?.size || 0)}
                    </div>
                  </div>
                  
                  {/* Image number badge */}
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 