# ReWear - Sustainable Clothing Swap Platform

A modern, sustainable platform that enables users to swap, sell, and earn from their pre-loved clothing items. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### For Users
- *Browse & Discover*: Explore a curated collection of pre-loved clothing items with detailed filtering and search capabilities
- *List Your Items*: Upload multiple images and detailed descriptions for your clothing with real-time preview
- *Earn Points*: Gain points for successful swaps and sales, with a gamified rewards system
- *User Dashboard*: Manage your listings, track earnings, view swap history, and monitor your sustainability impact
- *Image Management*: Upload, preview, and manage multiple images per item with drag-and-drop functionality
- *Responsive Design*: Seamless experience across desktop, tablet, and mobile devices
- *Item Details*: Comprehensive item pages with multiple image galleries, detailed descriptions, and seller information
- *Profile Management*: Update personal information, manage preferences, and track activity history
- *Notifications*: Real-time updates on swaps, messages, and platform announcements
- *Sustainability Tracking*: Monitor your environmental impact through clothing swaps

### For Administrators
- *Admin Panel*: Comprehensive dashboard with system controls and real-time monitoring
- *System Settings*: Dynamic toggles for registration, item creation, and platform features
- *User Management*: Monitor user activity, manage accounts, and view detailed user analytics
- *Quick Actions*: Streamlined tools for platform administration including bulk operations
- *Analytics Dashboard*: Track platform usage, user engagement, and sustainability metrics
- *Content Moderation*: Review and approve items, manage reported content
- *Platform Health*: Monitor system performance, user growth, and feature adoption
- *Emergency Controls*: Quick access to critical system settings for platform maintenance

### Core Functionality
- *Authentication System*: Secure user registration and login with role-based access control
- *Image Upload*: Multi-image support with preview, validation, and optimization
- *Points System*: Gamified rewards for sustainable fashion choices with leaderboards
- *Admin Controls*: Dynamic system settings and user management with audit trails
- *Modern UI*: Beautiful, accessible interface built with shadcn/ui and Tailwind CSS
- *Search & Filter*: Advanced search capabilities with multiple filter options
- *Real-time Updates*: Live notifications and status updates across the platform
- *Data Persistence*: Local storage management with automatic state synchronization
- *Error Handling*: Comprehensive error handling with user-friendly messages
- *Performance Optimization*: Lazy loading, image optimization, and efficient state management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. *Clone the repository*
   bash
   git clone <your-repository-url>
   cd closet-swap-and-earn-main
   

2. *Install dependencies*
   bash
   npm install
   

3. *Start the development server*
   bash
   npm run dev
   

4. *Open your browser*
   Navigate to http://localhost:5173 to view the application

## 🛠 Technology Stack

- *Frontend Framework*: React 18 with TypeScript
- *Build Tool*: Vite
- *Styling*: Tailwind CSS
- *UI Components*: shadcn/ui
- *State Management*: React Context API
- *Image Handling*: File API with preview functionality
- *Development*: ESLint, PostCSS

## 📁 Project Structure


src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ClothingCard.tsx # Item display component
│   └── Navbar.tsx      # Navigation component
├── pages/              # Application pages
│   ├── Landing.tsx     # Homepage
│   ├── Login.tsx       # Authentication
│   ├── Register.tsx    # User registration
│   ├── Dashboard.tsx   # User dashboard
│   ├── AddItem.tsx     # Item listing form
│   ├── Browse.tsx      # Item browsing
│   ├── ItemDetail.tsx  # Item details
│   └── Admin.tsx       # Admin panel
├── lib/                # Utilities and data
│   ├── data.ts         # Application state
│   └── utils.ts        # Helper functions
├── hooks/              # Custom React hooks
└── assets/             # Static assets and images


## 🎯 Key Features Explained

### Image Upload System
- *Multi-Image Support*: Upload up to 5 images per item with automatic optimization
- *Real-time Preview*: Instant image preview with drag-and-drop functionality
- *Validation System*: File type, size, and dimension validation with user feedback
- *Delete Functionality*: Remove individual images with confirmation dialogs
- *Image Optimization*: Automatic compression and resizing for optimal performance
- *Gallery View*: Multiple image display with navigation controls

### Points & Rewards System
- *Earning Mechanisms*: Points awarded for successful swaps, sales, and community engagement
- *Leaderboards*: Competitive rankings to encourage participation
- *Reward Tiers*: Multiple achievement levels with increasing benefits
- *Sustainability Impact*: Track environmental savings through clothing swaps
- *Gamification*: Badges, achievements, and progress tracking

### Admin Panel
- *System Settings*: Dynamic control over platform features
  - Toggle user registration on/off
  - Enable/disable item creation
  - Manage platform availability and maintenance mode
  - Control feature flags and experimental features
- *Quick Actions*: Streamlined administrative tasks
  - Bulk user management operations
  - System health monitoring
  - Emergency platform controls
- *User Management*: Comprehensive user oversight
  - View detailed user profiles and activity
  - Manage user roles and permissions
  - Monitor user engagement metrics

### Authentication & Security
- *Role-Based Access*: Different permission levels for users and administrators
- *Session Management*: Secure login/logout with automatic session handling
- *Data Protection*: Local storage encryption and secure data handling
- *Input Validation*: Comprehensive form validation and sanitization
- *Error Handling*: User-friendly error messages and recovery options

### Responsive Design
- *Mobile-First Approach*: Optimized for mobile devices with progressive enhancement
- *Cross-Platform Compatibility*: Seamless experience across desktop, tablet, and mobile
- *Touch-Friendly Interface*: Optimized touch targets and gesture support
- *Adaptive Layout*: Dynamic layouts that adapt to different screen sizes
- *Performance Optimization*: Fast loading times and smooth interactions

### Data Management
- *State Management*: Centralized state management with React Context API
- *Local Storage*: Persistent data storage with automatic synchronization
- *Data Validation*: Comprehensive validation for all user inputs
- *Error Recovery*: Automatic error recovery and data backup systems
- *Real-time Updates*: Live data synchronization across components

### User Experience Features
- *Intuitive Navigation*: Clear navigation structure with breadcrumbs
- *Loading States*: Smooth loading indicators and skeleton screens
- *Toast Notifications*: Non-intrusive feedback for user actions
- *Confirmation Dialogs*: Prevent accidental actions with confirmation prompts
- *Accessibility*: WCAG compliant design with keyboard navigation support

## 🔧 Configuration

### Environment Variables
Create a .env file in the root directory:

env
VITE_APP_TITLE=ReWear
VITE_APP_DESCRIPTION=Sustainable Clothing Swap Platform


### Customization
- Modify src/lib/data.ts to adjust initial data
- Update tailwind.config.ts for theme customization
- Edit src/components/ui/ for component styling

## 🚀 Deployment

### Build for Production
bash
npm run build


### Preview Production Build
bash
npm run preview


### Deploy Options
- *Vercel*: Connect your GitHub repository for automatic deployments
- *Netlify*: Drag and drop the dist folder after building
- *GitHub Pages*: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

### Communication & Social Features
- *Real-time Chat*: Direct messaging between users with file sharing
- *Video Calls*: Face-to-face communication for item inspection
- *Community Forums*: Discussion boards for fashion tips and sustainability
- *Social Features*: User reviews, ratings, and social sharing
- *Influencer Integration*: Partner with sustainable fashion influencers

### Advanced Technology
- *AI Recommendations*: Smart item suggestions based on user preferences
- *AR Try-On*: Virtual fitting room using augmented reality
- *Blockchain Integration*: Transparent transaction history and authenticity verification
- *Machine Learning*: Predictive analytics for demand forecasting
- *IoT Integration*: Smart closet management and inventory tracking

### Payment & Commerce
- *Payment Integration*: Secure payment processing with multiple payment methods
- *Escrow System*: Secure payment holding until item delivery
- *Insurance Options*: Protection for high-value items during shipping
- *Subscription Models*: Premium features and exclusive access
- *Microtransactions*: Small payments for premium features

### Platform Expansion
- *Mobile App*: Native iOS and Android applications
- *API Development*: Public API for third-party integrations
- *Multi-language Support*: International expansion with localization
- *B2B Features*: Business accounts for thrift stores and fashion brands
- *Marketplace Integration*: Connect with existing e-commerce platforms

### Sustainability & Impact
- *Carbon Footprint Tracking*: Detailed environmental impact calculations
- *Sustainability Certifications*: Partner with environmental organizations
- *Impact Reporting*: Monthly sustainability reports for users
- *Green Shipping*: Carbon-neutral shipping options
- *Circular Economy Metrics*: Track contribution to circular fashion economy

### Advanced Features
- *Advanced Search*: AI-powered search with image recognition
- *Virtual Styling*: AI-powered outfit recommendations
- *Size Prediction*: Machine learning for accurate size matching
- *Condition Assessment*: AI-powered item condition evaluation
- *Trend Analysis*: Real-time fashion trend tracking and insights

## 🌱 Sustainability Mission

### Environmental Impact
ReWear is committed to reducing the environmental impact of the fashion industry by promoting circular fashion practices. Our platform helps users:

- *Reduce Textile Waste*: Extend the lifecycle of clothing items through swapping
- *Lower Carbon Footprint*: Reduce demand for new clothing production
- *Conserve Resources*: Save water, energy, and raw materials used in manufacturing
- *Promote Conscious Consumption*: Encourage thoughtful purchasing decisions

### Circular Economy Contribution
- *Item Lifecycle Extension*: Average item gets 3-5 additional uses
- *Waste Reduction*: Divert thousands of clothing items from landfills annually
- *Community Building*: Create sustainable fashion communities
- *Education*: Provide resources on sustainable fashion practices

### Impact Metrics
- *CO2 Savings*: Track carbon emissions avoided through clothing swaps
- *Water Conservation*: Monitor water savings from reduced production
- *Waste Diversion*: Measure clothing items kept out of landfills
- *Community Growth*: Track user engagement and platform adoption

---

*ReWear* - Making sustainable fashion accessible, one swap at a time! 🌱👕

Join us in creating a more sustainable future through conscious fashion choices.