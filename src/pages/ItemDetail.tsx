import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dataStore } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Coins, 
  User, 
  MapPin, 
  Calendar,
  Package,
  Heart,
  Share2,
  ArrowUpDown,
  CheckCircle
} from 'lucide-react';

export const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(dataStore.getItemById(id || ''));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRequestingSwap, setIsRequestingSwap] = useState(false);
  
  const currentUser = dataStore.getCurrentUser();

  useEffect(() => {
    if (!item) {
      navigate('/browse');
    }
  }, [item, navigate]);

  if (!item) {
    return null;
  }

  const isOwner = currentUser?.id === item.uploaderId;
  const canRedeem = currentUser && currentUser.points >= item.pointValue && item.status === 'available' && !isOwner;
  const canSwap = currentUser && item.status === 'available' && !isOwner;

  const handleRedeem = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsRedeeming(true);
    try {
      const success = dataStore.claimItem(item.id);
      
      if (success) {
        toast({
          title: "Item claimed successfully!",
          description: `You've claimed "${item.title}" for ${item.pointValue} points. The seller has earned their points!`,
        });
        
        // Update local state
        setItem(prev => prev ? { ...prev, status: 'claimed' } : null);
        
        // Navigate back to browse after a short delay
        setTimeout(() => navigate('/browse'), 2000);
      } else {
        toast({
          title: "Claim failed",
          description: "You don't have enough points or the item is no longer available.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleRequestSwap = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsRequestingSwap(true);
    try {
      dataStore.createSwapRequest(item.uploaderId, item.id, "I'd like to swap for this item!");
      
      toast({
        title: "Swap request sent!",
        description: `Your swap request for "${item.title}" has been sent to ${item.uploaderName}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send swap request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRequestingSwap(false);
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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={item.images[selectedImageIndex]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>

                {/* Condition Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={getConditionColor(item.condition)}>
                    {item.condition}
                  </Badge>
                </div>

                {/* Points Badge */}
                {item.status === 'available' && (
                  <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2 text-foreground">
                      <Coins className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{item.pointValue} pts</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-primary'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>by {item.uploaderName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Listed {item.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Main Actions */}
            {item.status === 'available' && !isOwner && currentUser && (
              <div className="space-y-3">
                <Button
                  onClick={handleRedeem}
                  disabled={!canRedeem || isRedeeming}
                  className="w-full"
                  size="lg"
                >
                  <Coins className="mr-2 h-5 w-5" />
                  {isRedeeming ? "Claiming..." : `Claim for ${item.pointValue} points`}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleRequestSwap}
                  disabled={!canSwap || isRequestingSwap}
                  className="w-full"
                  size="lg"
                >
                  <ArrowUpDown className="mr-2 h-5 w-5" />
                  {isRequestingSwap ? "Sending..." : "Request Swap"}
                </Button>

                {!canRedeem && currentUser.points < item.pointValue && (
                  <p className="text-sm text-muted-foreground text-center">
                    You need {item.pointValue - currentUser.points} more points to redeem this item.
                  </p>
                )}
              </div>
            )}

            {item.status !== 'available' && (
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5" />
                  <span>This item has been {item.status}</span>
                </div>
              </Card>
            )}

            {!currentUser && (
              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full" size="lg">
                    Sign in to redeem or swap
                  </Button>
                </Link>
              </div>
            )}

            {isOwner && (
              <Card className="p-4 bg-surface">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <span>This is your listing</span>
                </div>
              </Card>
            )}

            <Separator />

            {/* Item Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Category</h4>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              
              {item.type && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Type</h4>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              )}
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Size</h4>
                <Badge variant="outline">{item.size}</Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Condition</h4>
                <Badge className={getConditionColor(item.condition)}>
                  {item.condition}
                </Badge>
              </div>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-foreground mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};