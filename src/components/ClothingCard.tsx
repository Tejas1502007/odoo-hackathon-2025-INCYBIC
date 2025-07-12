import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClothingItem } from '@/lib/data';
import { Coins, Eye, Heart, Trash2, Edit } from 'lucide-react';
import { dataStore } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ConfirmDialog } from './ConfirmDialog';
import { useState } from 'react';

interface ClothingCardProps {
  item: ClothingItem;
  showActions?: boolean;
}

export const ClothingCard = ({ item, showActions = false }: ClothingCardProps) => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    try {
      const success = dataStore.deleteItem(item.id);
      if (success) {
        toast({
          title: "Item deleted",
          description: `"${item.title}" has been removed from your listings.`,
        });
        // Refresh the page to update the dashboard
        window.location.reload();
      } else {
        toast({
          title: "Delete failed",
          description: "Failed to delete the item. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the item.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success text-white';
      case 'swapped':
        return 'bg-secondary text-secondary-foreground';
      case 'redeemed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-success text-white';
      case 'like-new':
        return 'bg-primary text-primary-foreground';
      case 'good':
        return 'bg-accent text-accent-foreground';
      case 'fair':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-glow hover:scale-[1.02] bg-card border-border">
      <div className="relative overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <Badge className={getStatusColor(item.status)}>
            {item.status}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={getConditionColor(item.condition)}>
            {item.condition}
          </Badge>
        </div>
        {item.status === 'available' && (
          <div className="absolute bottom-2 right-2 bg-surface/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <div className="flex items-center space-x-1 text-xs text-foreground">
              <Coins className="h-3 w-3 text-primary" />
              <span>{item.pointValue} pts</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Size: {item.size}</span>
            <span>by {item.uploaderName}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link to={`/item/${item.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4" />
              View
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        description={`Are you sure you want to delete "${item.title}"? This action cannot be undone and the item will be permanently removed from your listings.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </Card>
  );
};