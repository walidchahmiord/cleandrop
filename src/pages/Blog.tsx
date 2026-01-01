import { motion } from 'framer-motion';

const blogPosts = [
  { title: '10 Hygiene Tips for Travelers', excerpt: 'Stay clean and healthy on your adventures with these essential tips.', date: 'Dec 15, 2025' },
  { title: 'Why Plastic-Free Matters', excerpt: 'The impact of single-use plastics on our oceans and how you can help.', date: 'Dec 10, 2025' },
  { title: 'CleanDrop Goes Viral: 120M Views', excerpt: 'How our soap sheets became a social media sensation.', date: 'Dec 5, 2025' },
];

const Blog = () => (
  <main className="min-h-screen bg-background pt-24">
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-5xl font-medium">Blog & Media</h1>
          <p className="mt-4 text-xl text-muted-foreground">Tips, stories, and the latest from CleanDrop.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, i) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-card p-6 rounded-2xl border hover-lift cursor-pointer">
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <h2 className="font-display text-xl mt-2">{post.title}</h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Blog;
