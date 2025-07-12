# ReWear - Community Clothing Exchange

A sustainable fashion platform that enables community members to swap, share, and discover pre-loved clothing.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible**: Built with ARIA labels, keyboard navigation, and screen reader support
- **Modern UI**: Clean, professional design with smooth animations
- **Form Validation**: Real-time validation with helpful error messages
- **Image Upload**: Drag & drop file upload with preview functionality
- **Dynamic Forms**: Smart form fields that update based on user selections

## 📁 Project Structure

```
ReWear/
├── index.html              # Homepage with hero carousel and featured items
├── list-item.html          # Form page for listing new items
├── browse-items.html       # Browse items page (coming soon)
├── styles.css              # Main stylesheet with responsive design
├── form-styles.css         # Additional styles for form pages
├── script.js               # Main JavaScript functionality
├── form-script.js          # Form-specific JavaScript
├── navigation.js           # Shared navigation utilities
└── README.md              # This file
```

## 🎨 Pages

### 1. Homepage (`index.html`)
- **Hero Carousel**: Rotating banner with sustainable fashion messaging
- **CTA Buttons**: Quick access to main actions (Start Swapping, Browse, List Item)
- **Categories**: Browse by Men, Women, Kids, Accessories
- **Featured Items**: Showcase of popular community listings
- **Footer**: Links to help, community guidelines, and company info

### 2. List an Item (`list-item.html`)
- **Image Upload**: Multi-file upload with drag & drop support
- **Item Details**: Title, description, category, type, size, condition
- **Smart Forms**: Dynamic dropdowns that update based on selections
- **Validation**: Real-time form validation with helpful error messages
- **Help Sidebar**: Tips for taking photos and writing descriptions

### 3. Browse Items (`browse-items.html`)
- **Coming Soon**: Placeholder page showing planned features
- **Feature Preview**: Advanced search, mobile-friendly, favorites, messaging

## 🔗 Navigation Structure

All pages are interconnected with consistent navigation:

### Main Navigation
- **Home** → `index.html`
- **Browse Items** → `browse-items.html`
- **Add Item** → `list-item.html`
- **Login** → `login.html` (placeholder)
- **Register** → `register.html` (placeholder)

### Footer Links
- **Community**: How it Works, Safety Guidelines, Community Rules
- **Support**: Help Center, Contact Us, Report an Issue
- **About**: Our Mission, Privacy Policy, Terms of Service

## 🚀 Getting Started

1. **Open the website**: Start with `index.html` in your browser
2. **Navigate**: Use the top navigation or CTA buttons to explore
3. **List an item**: Click "List an Item" to access the form
4. **Browse**: Click "Browse Items" to see the coming soon page

## 💻 Technical Details

### CSS Features
- **CSS Custom Properties**: Consistent design system with variables
- **Flexbox & Grid**: Modern layout techniques
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: High contrast support and focus indicators

### JavaScript Features
- **Form Validation**: Real-time validation with error handling
- **File Upload**: Drag & drop with image preview
- **Carousel**: Auto-playing hero carousel with touch support
- **Mobile Navigation**: Responsive hamburger menu
- **Accessibility**: Screen reader support and keyboard navigation

### Responsive Breakpoints
- **Mobile**: < 480px (single column)
- **Tablet**: 480px - 768px (2 columns)
- **Desktop**: > 768px (full layout)

## 🎯 Future Development

The website is structured to easily add new pages:

### Planned Pages
- `login.html` - User authentication
- `register.html` - User registration
- `profile.html` - User profile management
- `messages.html` - Direct messaging system
- `favorites.html` - Saved items
- `about.html` - Company mission and story
- `help.html` - Help center and FAQs
- `contact.html` - Contact form
- `terms.html` - Terms of service
- `privacy.html` - Privacy policy

### Enhanced Browse Items
- Advanced filtering and search
- Item detail pages
- User profiles
- Messaging system
- Favorites and watchlists

## 🌱 Sustainability Focus

ReWear promotes sustainable fashion through:
- **Clothing Swaps**: Extending garment lifecycles
- **Community Building**: Local fashion exchanges
- **Waste Reduction**: Keeping clothes out of landfills
- **Conscious Consumption**: Encouraging thoughtful fashion choices

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development Notes

- All images use Unsplash for high-quality placeholders
- Forms include comprehensive validation
- Navigation is managed centrally via `navigation.js`
- Styles are modular and maintainable
- Code follows accessibility best practices

---

**ReWear** - Building a sustainable fashion community, one swap at a time. ♻️