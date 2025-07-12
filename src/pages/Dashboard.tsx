import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClothingCard } from '@/components/ClothingCard';
import { dataStore } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, 
  Plus, 
  Package, 
  ArrowUpDown, 
  TrendingUp,
  User,
  MapPin,
  Calendar
} from 'lucide-react';

export const Dashboard = () => {
  const [user, setUser] = useState(dataStore.getCurrentUser());
  const [userItems, setUserItems] = useState(dataStore.getUserItems(user?.id || ''));
  const [swapRequests, setSwapRequests] = useState(dataStore.getUserSwapRequests(user?.id || ''));
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Refresh data
    setUserItems(dataStore.getUserItems(user.id));
    setSwapRequests(dataStore.getUserSwapRequests(user.id));
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: 'Available Points',
      value: user.points,
      icon: Coins,
      description: 'Use to redeem items',
      color: 'text-primary'
    },
    {
      title: 'Items Listed',
      value: userItems.length,
      icon: Package,
      description: 'Your contributions',
      color: 'text-accent'
    },
    {
      title: 'Swaps Made',
      value: swapRequests.filter(req => req.status === 'accepted').length,
      icon: ArrowUpDown,
      description: 'Successful exchanges',
      color: 'text-success'
    },
    {
      title: 'Items Saved',
      value: userItems.filter(item => item.status === 'redeemed').length + 
             swapRequests.filter(req => req.status === 'accepted').length,
      icon: TrendingUp,
      description: 'Environmental impact',
      color: 'text-secondary'
    }
  ];

  const pendingSwaps = swapRequests.filter(req => req.status === 'pending');
  const acceptedSwaps = swapRequests.filter(req => req.status === 'accepted');
  const availableItems = userItems.filter(item => item.status === 'available');
  const redeemedItems = userItems.filter(item => item.status === 'redeemed');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-primary-glow rounded-xl p-6 text-primary-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-primary-foreground/90 mb-4 md:mb-0">
                Ready to continue your sustainable fashion journey?
              </p>
              <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.city}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/add-item">
                <Button variant="secondary" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  List New Item
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Browse Items
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">
              Swaps
              {pendingSwaps.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingSwaps.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* My Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Your Listed Items</h2>
              <Link to="/add-item">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </Link>
            </div>

            {userItems.length > 0 ? (
              <div className="space-y-6">
                {/* Item Management Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">Manage Your Items</h3>
                    <p className="text-sm text-muted-foreground">
                      View, edit, or delete your listed items. Items can only be deleted if they haven't been claimed.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Package className="mr-2 h-4 w-4" />
                      {userItems.length} Items
                    </Button>
                  </div>
                </div>
                
                {/* Items Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userItems.map((item) => (
                    <ClothingCard key={item.id} item={item} showActions />
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No items listed yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start by listing your first item to begin earning points and connecting with the community.
                  </p>
                  <Link to="/add-item">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      List Your First Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Swaps Tab */}
          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Swap Activity</h2>

            {/* Pending Swaps */}
            {pendingSwaps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowUpDown className="mr-2 h-5 w-5" />
                    Pending Swaps ({pendingSwaps.length})
                  </CardTitle>
                  <CardDescription>
                    Swap requests waiting for response
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingSwaps.map((swap) => (
                      <div key={swap.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">
                            Swap request for item #{swap.requestedItemId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Requested {swap.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Accepted Swaps */}
            {acceptedSwaps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Successful Swaps ({acceptedSwaps.length})
                  </CardTitle>
                  <CardDescription>
                    Your completed exchanges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {acceptedSwaps.map((swap) => (
                      <div key={swap.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">
                            Swapped item #{swap.requestedItemId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Completed {swap.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-success text-white">Completed</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {swapRequests.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ArrowUpDown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No swaps yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start browsing items to make your first swap request.
                  </p>
                  <Link to="/browse">
                    <Button>
                      Browse Items
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
            
            <div className="space-y-4">
              {/* Available Items */}
              {availableItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-success">Available Items ({availableItems.length})</CardTitle>
                    <CardDescription>Items currently available for swap/redemption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableItems.slice(0, 3).map((item) => (
                        <ClothingCard key={item.id} item={item} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Redeemed Items */}
              {redeemedItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary">Redeemed Items ({redeemedItems.length})</CardTitle>
                    <CardDescription>Items that have been redeemed using points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {redeemedItems.slice(0, 3).map((item) => (
                        <ClothingCard key={item.id} item={item} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {userItems.length === 0 && swapRequests.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No activity yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start your sustainable fashion journey by listing items or browsing the marketplace.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link to="/add-item">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          List an Item
                        </Button>
                      </Link>
                      <Link to="/browse">
                        <Button variant="outline">
                          Browse Items
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};