import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { dataStore } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Package, Upload, Image as ImageIcon } from 'lucide-react';
import { filesToDataUrls } from '@/lib/imageUtils';

export const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: 'good' as const,
    fitType: 'Standard' as const,
    pointValue: 0,
    status: 'available' as const
  });
  const [calculatedPoints, setCalculatedPoints] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const user = dataStore.getCurrentUser();

  if (!user) {
    navigate('/login');
    return null;
  }

  const categories = ['Outerwear', 'Winterwear', 'Footwear', 'Dresses', 'Bottoms', 'Tops', 'Accessories'];
  const types = ['T-Shirt', 'Sweater', 'Jacket', 'Jeans', 'Dress', 'Skirt', 'Sneakers', 'Bag'];
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Kids 2-3', 'Kids 4-5', 'Kids 6-7'];
  const fitTypes = ['Standard', 'Plus', 'Petite', 'Kids'];
  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'like-new', label: 'Like new' },
    { value: 'good', label: 'Good condition' },
    { value: 'fair', label: 'Fair condition' }
  ];

  // Calculate points when form data changes
  useEffect(() => {
    if (formData.category && formData.condition && formData.size && formData.fitType) {
      const points = dataStore.calculatePoints(
        formData.category, 
        formData.condition, 
        formData.size, 
        formData.fitType
      );
      setCalculatedPoints(points);
      setFormData(prev => ({ ...prev, pointValue: points }));
    }
  }, [formData.category, formData.condition, formData.size, formData.fitType]);

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
      const maxFiles = 5;
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

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
            description: "Please upload only JPEG, PNG, or WebP images.",
            variant: "destructive",
          });
          return;
        }

        // Validate file size
        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: "Each image must be smaller than 5MB.",
            variant: "destructive",
          });
          return;
        }

        newFiles.push(file);
      });

      if (newFiles.length > 0) {
        setImages(prev => [...prev, ...newFiles]);
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.title || !formData.description || !formData.category) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      if (images.length === 0) {
        toast({
          title: "No images",
          description: "Please upload at least one image of your item.",
          variant: "destructive",
        });
        return;
      }

      // Convert images to base64 strings for storage (in a real app, you'd upload to a server)
      const imageDataUrls = await filesToDataUrls(images);

      const settings = dataStore.getSettings();
      let approved = false;
      if (user.role === 'admin' && settings.autoApproveAdminItems) {
        approved = true;
      } else if (settings.contentModeration === 'automatic') {
        approved = !dataStore.isFlagged ? true : !dataStore.isFlagged(formData); // implement isFlagged as needed
      }

      const newItem = dataStore.addItem({
        ...formData,
        tags,
        images: imageDataUrls,
        approved: approved
      });

      toast({
        title: "Item listed successfully!",
        description: `"${newItem.title}" has been added to your listings.`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to list item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags(prev => [...prev, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">List New Item</h1>
          <p className="text-muted-foreground">
            Share your unused clothes with the ReWear community
          </p>
        </div>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Item Details
            </CardTitle>
            <CardDescription>
              Provide information about the clothing item you want to list
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Item Photos *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload up to 5 photos of your item (JPEG, PNG, WebP, max 5MB each)
                      </p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || images.length >= 5}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {isUploading ? "Uploading..." : "Choose Files"}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    {images.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {images.length}/5 images uploaded
                      </p>
                    )}
                  </div>
                  
                  {imageUrls.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Uploaded Images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={url} 
                              alt={`Item ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-border"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {images[index]?.name?.substring(0, 15)}...
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {formatFileSize(images[index]?.size || 0)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointValue">Point Value</Label>
                  <Input
                    id="pointValue"
                    type="number"
                    min="10"
                    max="200"
                    value={formData.pointValue}
                    onChange={(e) => handleChange('pointValue', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Points required for redemption (10-200)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item's condition, style, brand, and any other relevant details..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                />
              </div>

              {/* Category & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Size & Fit Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map(size => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fit Type *</Label>
                  <Select value={formData.fitType} onValueChange={(value) => handleChange('fitType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fit type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fitTypes.map(fitType => (
                        <SelectItem key={fitType} value={fitType}>
                          {fitType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <Label>Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(condition => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Point Preview */}
              {calculatedPoints > 0 && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Point Calculation Preview</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    You will earn <span className="font-bold text-primary">{calculatedPoints} points</span> when this item is claimed.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Base points ({formData.category}): {dataStore.calculatePoints(formData.category, 'fair', 'S', 'Standard') - 5}</div>
                    <div>• Condition bonus ({formData.condition}): varies</div>
                    <div>• Size/Fit modifier: varies</div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-4">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., vintage, summer, casual)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Tags help others find your item. Press Enter or click + to add.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Listing Item..." : "List Item"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};