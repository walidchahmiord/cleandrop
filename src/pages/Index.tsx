import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Sparkles, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroForest from '@/assets/hero-forest.jpg';
import natureStream from '@/assets/nature-stream.jpg';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, products } from '@/data/products';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const featuredProducts = getFeaturedProducts();

  const features = [
    {
      icon: Leaf,
      title: '100% Biodegradable',
      description: 'Dissolves completely, leaving no trace in nature.',
    },
    {
      icon: Droplets,
      title: 'Water-Activated',
      description: 'Just add water for instant rich lather.',
    },
    {
      icon: Sparkles,
      title: 'Plant-Based Formula',
      description: 'Gentle on skin, tough on germs.',
    },
  ];

  const stats = [
    { value: '120M+', label: 'Views on Social' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '4.9', label: 'Average Rating' },
    { value: '0', label: 'Plastic Waste' },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src={heroForest}
            alt="Forest background"
            className="w-full h-full object-cover"
          />
          <div className="overlay-forest" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 backdrop-blur-sm text-primary-foreground rounded-full text-sm font-medium mb-6">
              Eco-Friendly Hand Hygiene Revolution
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground leading-tight"
          >
            Clean Hands,
            <br />
            <span className="text-accent">Anywhere.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Pocket-sized, dissolvable soap sheets that fit your lifestyle.
            100% biodegradable. Zero plastic waste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full">
                Shop Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full">
                <Play className="mr-2" size={20} />
                See How It Works
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
              Nature Meets Innovation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, sustainable, and designed for life on the go.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl text-center hover-lift"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
                Featured Collection
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                Discover our most loved scents and formulas, crafted with care.
              </p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0">
              <Button variant="outline" className="rounded-full">
                View All Products
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Video Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={natureStream}
            alt="Nature stream"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-medium text-primary-foreground">
              See the Magic
            </h2>
            <p className="mt-4 text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Watch how a single sheet transforms into rich, cleansing lather in seconds.
            </p>

            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="How to use CleanDrop"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary font-display">
                  {stat.value}
                </div>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
              Join the Movement
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Over 120 million views across social media. See why everyone's talking about CleanDrop.
            </p>
          </motion.div>

          {/* Social Embeds Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10" />
                  <div>
                    <p className="font-medium">@eco_traveler</p>
                    <p className="text-sm text-muted-foreground">40M views</p>
                  </div>
                </div>
                <p className="text-foreground/80">
                  "These soap sheets are an absolute game changer for travel! 🌿 No more liquid restrictions at airports. My new travel essential."
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>❤️ 2.4M</span>
                  <span>💬 45K</span>
                  <span>🔄 189K</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-mint rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-medium text-primary-foreground">
              Ready to Make the Switch?
            </h2>
            <p className="mt-6 text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands who have already made the eco-friendly choice. Your hands and the planet will thank you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-full">
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
