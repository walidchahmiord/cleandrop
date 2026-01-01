import { motion } from 'framer-motion';
import heroForest from '@/assets/hero-forest.jpg';

const About = () => (
  <main className="min-h-screen bg-background pt-24">
    <section className="relative py-32">
      <img src={heroForest} alt="Forest" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="container mx-auto px-4 relative text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-6xl text-primary-foreground">Our Story</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-xl text-primary-foreground/80 max-w-3xl mx-auto">
          Born from a love of adventure and a commitment to our planet, CleanDrop reimagines hand hygiene for the modern world.
        </motion.p>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h2 className="font-display text-3xl">Our Mission</h2>
          <p className="text-muted-foreground">We believe clean hands shouldn't cost the Earth. Every CleanDrop product is 100% biodegradable, made with plant-based ingredients, and packaged without plastic. Join us in making hygiene sustainable.</p>
          <h2 className="font-display text-3xl mt-12">Sustainability First</h2>
          <p className="text-muted-foreground">From sourcing to shipping, every decision prioritizes our planet. Our soap sheets dissolve completely, leaving no trace in nature—just clean hands and a clear conscience.</p>
        </div>
      </div>
    </section>
  </main>
);

export default About;
