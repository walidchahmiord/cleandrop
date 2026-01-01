import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Leaf, Check, ArrowLeft, Share2 } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display">Product not found</h1>
          <Link to="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/products"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isBestseller && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-accent text-accent-foreground rounded-full font-semibold">
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold">
                  New
                </span>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span className="capitalize">{product.category}</span>
              <span>•</span>
              <span className="capitalize">{product.type}</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-muted-foreground">
                / {product.sheets} sheets
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-medium mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check size={14} className="text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-border rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-lg hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-lg hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <Button
                size="lg"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 rounded-xl py-6 text-lg"
              >
                <ShoppingBag className="mr-2" size={22} />
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Eco Badge */}
            <div className="mt-8 p-4 bg-primary/5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">100% Eco-Friendly</p>
                <p className="text-sm text-muted-foreground">
                  Biodegradable, zero plastic, sustainably sourced
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border">
        <h2 className="font-display text-3xl font-medium mb-8">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {product.reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'text-accent fill-accent' : 'text-muted'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16 border-t border-border">
          <h2 className="font-display text-3xl font-medium mb-8">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
