// ReWear App Data Store - Simulated Backend
import clothingSample1 from '@/assets/clothing-sample-1.jpg';
import clothingSample2 from '@/assets/clothing-sample-2.jpg';
import clothingSample3 from '@/assets/clothing-sample-3.jpg';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  preferredSizes: string[];
  points: number;
  profileImage?: string;
  role: 'user' | 'admin';
  trustTier: 'New Member' | 'Basic Giver' | 'Trusted Giver' | 'Super Swapper';
  badges: string[];
  totalListings: number;
  successfulExchanges: number;
  createdAt: Date;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  fitType: 'Standard' | 'Plus' | 'Petite' | 'Kids';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  status: 'available' | 'claimed' | 'pending' | 'redeemed';
  pointValue: number;
  createdAt: Date;
  approved: boolean;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  requestedItemId: string;
  offeredItemId?: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: Date;
}

// Simulated Data Store
class DataStore {
  private users: User[] = [];
  private items: ClothingItem[] = [];
  private swapRequests: SwapRequest[] = [];
  private currentUser: User | null = null;
  private settings = {
    autoApproveAdminItems: true,
    contentModeration: 'manual', // 'manual' or 'automatic'
    userRegistrationOpen: true,
    maintenanceMode: false,
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Sample users
    this.users = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@rewear.com',
        password: 'admin123',
        city: 'San Francisco',
        preferredSizes: ['M', 'L'],
        points: 500,
        role: 'admin',
        trustTier: 'Super Swapper',
        badges: ['Admin', 'Community Leader'],
        totalListings: 0,
        successfulExchanges: 0,
        createdAt: new Date('2024-01-01')
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: 'password123',
        city: 'New York',
        preferredSizes: ['S', 'M'],
        points: 150,
        role: 'user',
        trustTier: 'Trusted Giver',
        badges: ['First Listing', 'Community Member'],
        totalListings: 2,
        successfulExchanges: 5,
        createdAt: new Date('2024-02-15')
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        password: 'password123',
        city: 'Los Angeles',
        preferredSizes: ['L', 'XL'],
        points: 200,
        role: 'user',
        trustTier: 'Basic Giver',
        badges: ['Early Adopter'],
        totalListings: 1,
        successfulExchanges: 3,
        createdAt: new Date('2024-03-01')
      }
    ];

    // Sample clothing items
    this.items = [
      {
        id: '1',
        title: 'Vintage Denim Jacket',
        description: 'Classic blue denim jacket in excellent condition. Perfect for layering.',
        category: 'Outerwear',
        type: 'Jacket',
        size: 'M',
        condition: 'good',
        fitType: 'Standard',
        tags: ['vintage', 'denim', 'casual'],
        images: [clothingSample2],
        uploaderId: '2',
        uploaderName: 'Sarah Johnson',
        status: 'available',
        pointValue: 29, // Base: 22 (Outerwear) + Condition: 7 (Good)
        createdAt: new Date('2024-07-01'),
        approved: true
      },
      {
        id: '2',
        title: 'White Cotton T-Shirt',
        description: 'Soft organic cotton t-shirt, barely worn. Great basic piece.',
        category: 'Tops',
        type: 'T-Shirt',
        size: 'L',
        condition: 'like-new',
        fitType: 'Standard',
        tags: ['cotton', 'basic', 'white'],
        images: [clothingSample3],
        uploaderId: '3',
        uploaderName: 'Mike Chen',
        status: 'available',
        pointValue: 20, // Base: 12 (Tops) + Condition: 8 (Like New)
        createdAt: new Date('2024-07-05'),
        approved: true
      },
      {
        id: '3',
        title: 'Designer Wool Sweater',
        description: 'Luxurious wool sweater from premium brand. Cozy and stylish.',
        category: 'Tops',
        type: 'Sweater',
        size: 'S',
        condition: 'new',
        fitType: 'Standard',
        tags: ['wool', 'designer', 'cozy'],
        images: [clothingSample1],
        uploaderId: '2',
        uploaderName: 'Sarah Johnson',
        status: 'available',
        pointValue: 22, // Base: 12 (Tops) + Condition: 10 (New)
        createdAt: new Date('2024-07-10'),
        approved: true
      }
    ];
  }

  // Authentication
  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  }

  register(userData: Omit<User, 'id' | 'points' | 'role' | 'createdAt' | 'trustTier' | 'badges' | 'totalListings' | 'successfulExchanges'>): User {
    if (!this.settings.userRegistrationOpen) {
      throw new Error('Registration is currently closed.');
    }
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      points: 0, // Starting points (changed from 100 to 0)
      role: 'user',
      trustTier: 'New Member',
      badges: [],
      totalListings: 0,
      successfulExchanges: 0,
      createdAt: new Date()
    };
    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  // Items
  getAllItems(): ClothingItem[] {
    return this.items.filter(item => item.approved);
  }

  getItemById(id: string): ClothingItem | undefined {
    return this.items.find(item => item.id === id);
  }

  getUserItems(userId: string): ClothingItem[] {
    return this.items.filter(item => item.uploaderId === userId);
  }

  addItem(itemData: Omit<ClothingItem, 'id' | 'uploaderId' | 'uploaderName' | 'createdAt' | 'approved'>): ClothingItem {
    const user = this.getCurrentUser();
    if (!user) throw new Error('User not logged in');
    let approved = false;
    if (user.role === 'admin' && this.settings.autoApproveAdminItems) {
      approved = true;
    } else if (this.settings.contentModeration === 'automatic') {
      // Implement isFlagged as needed
      approved = true; // For now, auto-approve for automatic moderation
    }

    const newItem: ClothingItem = {
      ...itemData,
      id: Date.now().toString(),
      uploaderId: user.id,
      uploaderName: user.name,
      createdAt: new Date(),
      approved,
    };
    this.items.push(newItem);
    
    // Update user's listing count
    user.totalListings += 1;
    this.updateTrustTier(user);
    
    return newItem;
  }

  // Legacy redemption method - replaced by claimItem
  redeemItem(itemId: string): boolean {
    // Redirect to new claiming system
    return this.claimItem(itemId);
  }

  updateUserPoints(userId: string, newPoints: number) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].points = newPoints;
    }
  }

  // Swap Requests
  createSwapRequest(toUserId: string, requestedItemId: string, message?: string): SwapRequest {
    const user = this.getCurrentUser();
    if (!user) throw new Error('User not logged in');

    const newRequest: SwapRequest = {
      id: Date.now().toString(),
      fromUserId: user.id,
      toUserId,
      requestedItemId,
      status: 'pending',
      message,
      createdAt: new Date()
    };
    this.swapRequests.push(newRequest);
    return newRequest;
  }

  getUserSwapRequests(userId: string): SwapRequest[] {
    return this.swapRequests.filter(req => 
      req.fromUserId === userId || req.toUserId === userId
    );
  }

  // Admin functions
  getAllItemsForAdmin(): ClothingItem[] {
    return this.items;
  }

  approveItem(itemId: string): boolean {
    const item = this.getItemById(itemId);
    if (item) {
      item.approved = true;
      return true;
    }
    return false;
  }

  deleteItem(itemId: string): boolean {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  // Point Calculation System
  calculatePoints(category: string, condition: 'new' | 'like-new' | 'good' | 'fair', size: string, fitType: 'Standard' | 'Plus' | 'Petite' | 'Kids'): number {
    // Base points by category
    const basePoints: Record<string, number> = {
      'Outerwear': 22,
      'Winterwear': 22,
      'Footwear': 18,
      'Dresses': 15,
      'Bottoms': 12,
      'Tops': 12,
      'Accessories': 8
    };

    // Condition bonuses
    const conditionBonus: Record<string, number> = {
      'new': 10,
      'like-new': 8,
      'good': 7,
      'fair': 5
    };

    // Size modifiers
    const sizeModifier: Record<string, number> = {
      'XXS': 2, 'XXXS': 2, // Rare sizes
      'XXL': 1, 'XXXL': 2, // Larger sizes
      'Kids 2-3': -2, 'Kids 4-5': -2, 'Kids 6-7': -1, // Kids sizes
      'Standard': 0
    };

    // Fit type modifiers
    const fitTypeModifier: Record<string, number> = {
      'Standard': 0,
      'Plus': 1,
      'Petite': 1,
      'Kids': -2
    };

    const base = basePoints[category] || 10;
    const bonus = conditionBonus[condition] || 5;
    const sizeMod = sizeModifier[size] || 0;
    const fitMod = fitTypeModifier[fitType] || 0;

    return Math.max(5, base + bonus + sizeMod + fitMod); // Minimum 5 points
  }

  // Claim item (buyer claims, seller earns points)
  claimItem(itemId: string): boolean {
    const user = this.getCurrentUser();
    const item = this.getItemById(itemId);
    const seller = this.users.find(u => u.id === item?.uploaderId);
    
    if (!user || !item || !seller || item.status !== 'available') return false;
    if (user.points < item.pointValue) return false;

    // Deduct points from buyer
    user.points -= item.pointValue;
    
    // Credit points to seller
    seller.points += item.pointValue;
    
    // Mark item as claimed
    item.status = 'claimed';
    
    // Update seller's stats
    seller.successfulExchanges += 1;
    
    // Update trust tier based on exchanges
    this.updateTrustTier(seller);
    
    // Update stored user
    this.updateUserPoints(user.id, user.points);
    this.updateUserPoints(seller.id, seller.points);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return true;
  }

  private updateTrustTier(user: User) {
    if (user.successfulExchanges >= 10 && user.totalListings >= 5) {
      user.trustTier = 'Super Swapper';
      if (!user.badges.includes('Super Swapper')) {
        user.badges.push('Super Swapper');
      }
    } else if (user.successfulExchanges >= 3 && user.totalListings >= 2) {
      user.trustTier = 'Trusted Giver';
      if (!user.badges.includes('Trusted Giver')) {
        user.badges.push('Trusted Giver');
      }
    } else if (user.totalListings >= 1) {
      user.trustTier = 'Basic Giver';
      if (!user.badges.includes('First Listing')) {
        user.badges.push('First Listing');
      }
    }
  }

  getSettings() {
    return this.settings;
  }
  setSetting(key: string, value: any) {
    this.settings[key] = value;
    // Optionally persist to localStorage or backend
  }
  isMaintenanceMode() {
    return this.settings.maintenanceMode;
  }
}

// Export singleton instance
export const dataStore = new DataStore();