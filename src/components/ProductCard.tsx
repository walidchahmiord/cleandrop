import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="product-card group"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isBestseller && (
            <span className="px-3 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              New
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
          >
            <ShoppingBag size={18} className="mr-2" />
            Add to Cart
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display text-xl font-medium text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.sheets} sheets
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
