import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Upload, CheckCircle } from 'lucide-react';

export const ImageUploadDemo: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Image Upload & Delete Demo</h1>
        <p className="text-muted-foreground">
          Test the enhanced image upload functionality with delete options
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Image Upload Component
          </CardTitle>
          <CardDescription>
            Upload images and test the delete functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxFiles={5}
            maxSize={5 * 1024 * 1024}
            required={true}
            label="Demo Images"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Features Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Upload Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Multiple file selection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  File type validation (JPEG, PNG, WebP)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  File size validation (max 5MB)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Real-time preview
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Delete Features:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Individual image deletion
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Remove all images option
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Confirmation dialogs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Visual feedback with toast notifications
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              Images: {images.length}/5
            </Badge>
            <Badge variant="outline">
              Total Size: {formatTotalSize(images)}
            </Badge>
            {images.length > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trash2 className="h-3 w-3" />
                Ready to delete
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const formatTotalSize = (files: File[]): string => {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(totalBytes) / Math.log(k));
  
  return parseFloat((totalBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 