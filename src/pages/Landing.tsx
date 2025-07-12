import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClothingCard } from '@/components/ClothingCard';
import { dataStore } from '@/lib/data';
import heroImage from '@/assets/hero-image.jpg';
import { 
  Recycle, 
  Users, 
  Leaf, 
  ArrowRight, 
  Heart,
  Coins,
  Handshake
} from 'lucide-react';

export const Landing = () => {
  const featuredItems = dataStore.getAllItems().slice(0, 3);

  const features = [
    {
      icon: Recycle,
      title: 'Sustainable Exchange',
      description: 'Give your clothes a new life while discovering unique pieces from other members.'
    },
    {
      icon: Coins,
      title: 'Points System',
      description: 'Earn points by listing items and use them to redeem clothes you love.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with like-minded people who care about sustainable fashion.'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Reduce textile waste and environmental impact through conscious consumption.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Items Exchanged' },
    { number: '5,000+', label: 'Active Members' },
    { number: '2.5M', label: 'Points Redeemed' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Recycle className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-6xl font-bold text-foreground">ReWear</h1>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-6">
            Sustainable Fashion Through Community Exchange
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-conscious individuals who are transforming their wardrobes 
            while protecting our planet. Swap, redeem, and discover amazing clothes in our 
            sustainable community marketplace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="hero" size="xl" className="min-w-[200px]">
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="xl" className="min-w-[200px]">
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ReWear?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just a clothing exchange - we're a movement towards 
              sustainable fashion and conscious consumption.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Items
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover amazing pieces from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredItems.map((item) => (
              <ClothingCard key={item.id} item={item} showActions />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/browse">
              <Button variant="default" size="lg">
                View All Items
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-primary-foreground mr-4" />
            <Handshake className="h-12 w-12 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join our community of sustainable fashion enthusiasts and start making a difference today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="xl" className="min-w-[200px]">
                Join ReWear
              </Button>
            </Link>
            <Link to="/add-item">
              <Button variant="outline" size="xl" className="min-w-[200px] bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                List Your First Item
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};