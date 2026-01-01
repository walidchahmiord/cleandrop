import { motion } from 'framer-motion';
import { Droplet, Hand, Sparkles, Leaf } from 'lucide-react';
import natureStream from '@/assets/nature-stream.jpg';

const HowItWorks = () => {
  const steps = [
    { icon: Hand, title: 'Take a Sheet', description: 'Remove a single sheet from your compact travel case.' },
    { icon: Droplet, title: 'Add Water', description: 'Wet the sheet with a little water in your hands.' },
    { icon: Sparkles, title: 'Lather Up', description: 'Rub hands together to create a rich, cleansing lather.' },
    { icon: Leaf, title: 'Rinse Clean', description: 'Rinse and enjoy perfectly clean hands anywhere.' },
  ];

  return (
    <main className="min-h-screen bg-background pt-24">
      <section className="py-20 relative overflow-hidden">
        <img src={natureStream} alt="Nature" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-5xl font-medium">How It Works</h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Clean hands in 4 simple steps. No mess, no waste.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon size={36} className="text-primary" />
                </div>
                <span className="text-accent font-bold text-lg">Step {i + 1}</span>
                <h3 className="font-display text-2xl mt-2">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
