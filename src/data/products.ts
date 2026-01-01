import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';
import product9 from '@/assets/product-9.jpg';
import product10 from '@/assets/product-10.jpg';
import product11 from '@/assets/product-11.jpg';
import product12 from '@/assets/product-12.jpg';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'essential' | 'botanical' | 'premium' | 'bundle' | 'therapeutic';
  type: 'unscented' | 'scented' | 'therapeutic';
  features: string[];
  sheets: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isBestseller?: boolean;
  isNew?: boolean;
}

const generateReviews = (productId: string): Review[] => {
  const reviewTemplates = [
    { name: 'Sarah M.', comment: 'Absolutely love these! Perfect for travel and so eco-friendly.', rating: 5 },
    { name: 'James K.', comment: 'Game changer for hiking trips. Compact and effective.', rating: 5 },
    { name: 'Emily R.', comment: 'The scent is divine and they lather so well!', rating: 4 },
    { name: 'Michael P.', comment: 'Finally found a sustainable soap solution. Highly recommend.', rating: 5 },
    { name: 'Lisa T.', comment: 'Great product, wish the sheets were slightly larger.', rating: 4 },
    { name: 'David W.', comment: 'My whole family uses these now. Kids love them!', rating: 5 },
  ];

  return reviewTemplates.map((template, index) => ({
    id: `${productId}-review-${index}`,
    userId: `user-${index}`,
    userName: template.name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${template.name}`,
    rating: template.rating,
    comment: template.comment,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Pure Essential',
    description: 'Our signature unscented formula. Perfect for sensitive skin and everyday use. Made with organic plant-based ingredients.',
    price: 12.99,
    image: product1,
    category: 'essential',
    type: 'unscented',
    features: ['50 biodegradable sheets', 'Hypoallergenic', 'Travel-friendly case', 'Dissolves in seconds'],
    sheets: 50,
    inStock: true,
    rating: 4.9,
    reviewCount: 2847,
    reviews: generateReviews('1'),
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Eucalyptus Mint',
    description: 'Refresh your senses with cooling eucalyptus and peppermint. Antibacterial properties for deep cleansing.',
    price: 14.99,
    image: product2,
    category: 'botanical',
    type: 'scented',
    features: ['50 botanical sheets', 'Essential oils', 'Antibacterial', 'Refreshing scent'],
    sheets: 50,
    inStock: true,
    rating: 4.8,
    reviewCount: 1923,
    reviews: generateReviews('2'),
  },
  {
    id: '3',
    name: 'Golden Honey',
    description: 'Luxurious honey-infused sheets with moisturizing properties. Leaves skin soft and nourished.',
    price: 16.99,
    image: product3,
    category: 'premium',
    type: 'therapeutic',
    features: ['40 premium sheets', 'Raw honey extract', 'Deep moisturizing', 'Vitamin E enriched'],
    sheets: 40,
    inStock: true,
    rating: 4.9,
    reviewCount: 1456,
    reviews: generateReviews('3'),
    isNew: true,
  },
  {
    id: '4',
    name: 'Forest Bamboo',
    description: 'Sustainable bamboo charcoal formula. Natural detoxifying properties for deep pore cleansing.',
    price: 15.99,
    image: product4,
    category: 'botanical',
    type: 'therapeutic',
    features: ['45 bamboo sheets', 'Activated charcoal', 'Detoxifying', 'Eco bamboo case'],
    sheets: 45,
    inStock: true,
    rating: 4.7,
    reviewCount: 1234,
    reviews: generateReviews('4'),
  },
  {
    id: '5',
    name: 'Lavender Dreams',
    description: 'Calming lavender for relaxation. Perfect for evening routines and stress relief.',
    price: 14.99,
    image: product5,
    category: 'botanical',
    type: 'scented',
    features: ['50 aromatherapy sheets', 'French lavender', 'Calming effect', 'Sleep support'],
    sheets: 50,
    inStock: true,
    rating: 4.9,
    reviewCount: 2156,
    reviews: generateReviews('5'),
    isBestseller: true,
  },
  {
    id: '6',
    name: 'Citrus Burst',
    description: 'Energizing citrus blend with orange, lemon, and grapefruit. Morning freshness in your pocket.',
    price: 13.99,
    image: product6,
    category: 'botanical',
    type: 'scented',
    features: ['50 vitamin C sheets', 'Natural citrus oils', 'Energizing', 'Brightening'],
    sheets: 50,
    inStock: true,
    rating: 4.6,
    reviewCount: 987,
    reviews: generateReviews('6'),
  },
  {
    id: '7',
    name: 'Rose Petal',
    description: 'Romantic rose essence with natural rose water. Gentle and luxurious cleansing experience.',
    price: 17.99,
    image: product7,
    category: 'premium',
    type: 'scented',
    features: ['40 luxury sheets', 'Bulgarian rose', 'Anti-aging', 'Toning properties'],
    sheets: 40,
    inStock: true,
    rating: 4.8,
    reviewCount: 876,
    reviews: generateReviews('7'),
    isNew: true,
  },
  {
    id: '8',
    name: 'Ocean Breeze',
    description: 'Fresh sea minerals and marine botanicals. Feel the ocean wherever you go.',
    price: 14.99,
    image: product8,
    category: 'botanical',
    type: 'scented',
    features: ['50 mineral sheets', 'Sea salt extract', 'Purifying', 'Refreshing'],
    sheets: 50,
    inStock: true,
    rating: 4.7,
    reviewCount: 1123,
    reviews: generateReviews('8'),
  },
  {
    id: '9',
    name: 'Tea Tree Clear',
    description: 'Powerful tea tree oil formula for acne-prone skin. Natural antibacterial protection.',
    price: 15.99,
    image: product9,
    category: 'therapeutic',
    type: 'therapeutic',
    features: ['45 treatment sheets', 'Pure tea tree oil', 'Acne fighting', 'Pore cleansing'],
    sheets: 45,
    inStock: true,
    rating: 4.8,
    reviewCount: 1567,
    reviews: generateReviews('9'),
  },
  {
    id: '10',
    name: 'Charcoal Detox',
    description: 'Activated charcoal deep cleansing formula. Draws out impurities and toxins.',
    price: 16.99,
    image: product10,
    category: 'premium',
    type: 'therapeutic',
    features: ['40 detox sheets', 'Japanese charcoal', 'Deep cleansing', 'Oil control'],
    sheets: 40,
    inStock: true,
    rating: 4.7,
    reviewCount: 945,
    reviews: generateReviews('10'),
  },
  {
    id: '11',
    name: 'Honey Oat',
    description: 'Gentle exfoliating formula with oatmeal and honey. Perfect for sensitive, dry skin.',
    price: 15.99,
    image: product11,
    category: 'premium',
    type: 'therapeutic',
    features: ['40 nourishing sheets', 'Colloidal oatmeal', 'Gentle exfoliation', 'Soothing'],
    sheets: 40,
    inStock: true,
    rating: 4.9,
    reviewCount: 1089,
    reviews: generateReviews('11'),
  },
  {
    id: '12',
    name: 'Coconut Paradise',
    description: 'Tropical coconut milk formula. Hydrating and nourishing for silky smooth skin.',
    price: 14.99,
    image: product12,
    category: 'botanical',
    type: 'scented',
    features: ['50 tropical sheets', 'Virgin coconut', 'Deep hydration', 'Natural glow'],
    sheets: 50,
    inStock: true,
    rating: 4.8,
    reviewCount: 1234,
    reviews: generateReviews('12'),
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isBestseller || p.isNew).slice(0, 4);
};
