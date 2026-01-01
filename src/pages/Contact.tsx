import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => (
  <main className="min-h-screen bg-background pt-24">
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-5xl font-medium">Get in Touch</h1>
          <p className="mt-4 text-xl text-muted-foreground">We'd love to hear from you.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex gap-4"><Mail className="text-primary" /><div><h3 className="font-medium">Email</h3><p className="text-muted-foreground">hello@cleandrop.eco</p></div></div>
            <div className="flex gap-4"><Phone className="text-primary" /><div><h3 className="font-medium">Phone</h3><p className="text-muted-foreground">1-800-CLEAN-GO</p></div></div>
            <div className="flex gap-4"><MapPin className="text-primary" /><div><h3 className="font-medium">Location</h3><p className="text-muted-foreground">Portland, Oregon</p></div></div>
          </div>
          <form className="space-y-6 bg-card p-8 rounded-2xl border">
            <div><Input placeholder="Your Name" /></div>
            <div><Input type="email" placeholder="Email Address" /></div>
            <div><Textarea placeholder="Your Message" rows={5} /></div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  </main>
);

export default Contact;
